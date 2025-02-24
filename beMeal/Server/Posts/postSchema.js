import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String },
  timePosted: { type: Date, default: Date.now },
  likeCount: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
