// postRoutes.js
import express from "express";
import Post from "../Posts/postSchema.js";
import User from "../Users/userSchema.js";
import { authMiddleware } from "../Authentication/middleware.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinaryPosts.js";

//set up upload to cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "postImages",
    allowed_formats: ["jpeg", "jpg", "png"],
  },
});

const upload = multer({ storage: storage });

const postRoutes = express.Router();

//outdated
/**
 * req body:
 * {
 *    username: String,
 *    image: String,
 *    caption: String
 * }
 */

//when making a new post, update the lastposted for the user who posted.
postRoutes.post("/createPost", upload.single("image"), async (req, res) => {
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

    const imagePath = req.file.path;

    // console.log(caption);

    const newPost = new Post({
      userID,
      username: user.userName,
      image: imagePath,
      caption: caption || "",

      //timePosted will use Date.now as default
      timePosted: new Date(),
    });

    const result = await newPost.save();
    user.posts.push(result._id);
    await user.save();

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error creating post" });
  }
});

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

postRoutes.get("/getFeed/:userID", async (req, res) => {
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

postRoutes.get("/getUserPosts/:userID", async (req, res) => {
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

postRoutes.put("/incLikes/:_postId", async (req, res) => {
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

postRoutes.get("/getPost/:_postId", async (req, res) => {
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

postRoutes.post("/:postId/addComment", async (req, res) => {
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

postRoutes.get("/:postId/getComments", async (req, res) => {
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
