// postRoutes.js
import express from "express";
import Post from "../Posts/postSchema.js";
import User from "../Users/userSchema.js"

const postRoutes = express.Router();

/**
 * req body:
 * {
 *    username: String,
 *    image: String,
 *    caption: String
 * }
 */

//when making a new post, update the lastposted for the user who posted.
postRoutes.post("/createPost", async (req, res) => {
  try {
    const { userID, image, caption } = req.body;
    if (!userID || !image) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const user = await User.findOne({ userID: userID });

    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }

    // console.log(caption);

    const newPost = new Post({
        userID,
        username: user.userName,
      image,
      caption: caption || "",

      //timePosted will use Date.now as default
      timePosted: new Date(),
    });

    const result = await newPost.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error creating post" });
  }
});

//change allPosts to getFeed
postRoutes.get("/allPosts", async (req, res) => {
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
    }).sort({ timePosted: -1 })
    .populate({
      path: "userID",
      model: "userprofiles",
      select: "userName",
    });

    res.status(200).json(postsFeed);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "error getting feed" });
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
