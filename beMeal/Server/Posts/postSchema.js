import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   //check if we need commentId, there is _id
//   commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
//   content: { type: String, required: true },
//   username: { type: String, required: true },
//   timePosted: { type: Date, default: Date.now },
// });

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String },
  timePosted: { type: Date, default: Date.now },
  likeCount: { type: Number, default: 0 },
  comments: [
    {
      content: { type: String, required: true },
      username: { type: String, required: true },
      timePosted: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
