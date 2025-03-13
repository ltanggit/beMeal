import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userprofiles",
    required: true,
  },
  image: { type: String, required: true },
  caption: { type: String },
  timePosted: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
