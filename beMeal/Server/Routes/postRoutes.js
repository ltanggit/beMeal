// postRoutes.js
import express from "express";
import Post from "../Posts/postSchema.js";

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
      return res.status(400).json({ error: "All fields are required" });
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
    res.status(500).json({ error: "server error" });
  }
});

postRoutes.get("/allPosts", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ timePosted: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

export default postRoutes;
