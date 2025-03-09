// postRoutes.js
import express from "express";
import Post from "../Posts/postSchema.js";
import { authMiddleware } from "../Authentication/middleware.js";

const postRoutes = express.Router();

/**
 * req body:
 * {
 *    username: String,
 *    image: String,
 *    caption: String
 * }
 */
postRoutes.post("/createPost", async (req, res) => {
  try {
    const { username, image, captionParsed } = req.body;
    if (!username || !image) {
      return res.status(400).json({ error: "all fields are required" });
    }

    let caption = "";
    if (captionParsed) {
      caption = captionParsed;
    }

    const newPost = new Post({
      username,
      image,
      caption,

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

postRoutes.get("/allPosts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ timePosted: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting all posts" });
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
