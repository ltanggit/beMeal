// postRoutes.js
import express from "express";
import Post from "../Posts/postSchema.js";
import User from "../Users/userSchema.js";
import { authMiddleware } from "../Authentication/middleware.js";
import multer from "multer";
import cloudinary from "../cloudinaryPosts.js";

const upload = multer({ dest: "uploads/" });

const postRoutes = express.Router();

/**
 * req body:
 * {
 *    username: String,
 *    image: String,
 *    caption: String
 * }
 */

postRoutes.post(
  "/createPost",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { userID, caption } = req.body;
      if (!userID || !req.file) {
        return res.status(400).json({ error: "all fields are required" });
      }

      const user = await User.findOne({ userID: userID });

      if (!user) {
        return res.status(400).json({ error: "user does not exist" });
      }
      // console.log("Uploaded file details:", req.file);

      const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "postImages",
        allowed_formats: ["jpeg", "jpg", "png"],
      });

      if (!cloudinaryUpload.secure_url) {
        return res.status(500).json({ error: "Cloudinary upload failed" });
      }

      const newPost = new Post({
        userID,
        username: user.userName,
        image: cloudinaryUpload.secure_url,
        caption: caption || "",

        //timePosted will use Date.now as default
        timePosted: new Date(),
      });

      const result = await newPost.save();

      //updates lastpostdate for the user when they make post, can change depending on updatestreak
      user.lastPostDate = new Date();

      user.posts.push(result._id);
      await user.save();

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error creating post" });
    }
  }
);

//change allPosts to getFeed

postRoutes.get("/allPosts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ timePosted: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting all posts" });
  }
});

postRoutes.get("/getFeed/:userID", authMiddleware, async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ userID }).select("following");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    if (!user.following || user.following.length === 0) {
      return res.status(404).json({ error: "user not following others" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const postsFeed = await Post.find({
      userID: { $in: user.following },
      timePosted: { $gte: today },
    })
      .sort({ timePosted: -1 })
      .populate({
        path: "userID",
        model: "userprofiles",
        select: "userName",
      });

    res.status(200).json(postsFeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting feed" });
  }
});

postRoutes.get("/getUserPosts/:userID", authMiddleware, async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ userID: userID }).populate({
      path: "posts",
      model: "Post",
      select: "-__v",
    });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user.posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error retrieving all user's posts" });
  }
});

postRoutes.put("/incLikes/:_postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params._postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    post.likeCount += 1;
    const result = await post.save();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error updating likes" });
  }
});

postRoutes.put("/decLikes/:_postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params._postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    post.likeCount -= 1;
    const result = await post.save();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error decrementing like" });
  }
});

postRoutes.get("/getPost/:_postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params._postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting post" });
  }
});

postRoutes.post("/:postId/addComment", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { username, content } = req.body;

    if (!username || !content) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    const newComment = {
      username,
      content,
      timestamp: new Date(),
    };

    post.comments.push(newComment);

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error adding comment" });
  }
});

postRoutes.get("/:postId/getComments", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting comments" });
  }
});

export default postRoutes;
