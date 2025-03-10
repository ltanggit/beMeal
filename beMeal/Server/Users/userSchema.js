import mongoose from "mongoose";

const Schema = mongoose.Schema; //extracting Schema from mongoose making it easier to use

const userSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectID, required: true, index: true },
  userName: { type: String, required: true, unique: true },
  bio: { type: String, maxLength: 1000, default: "" },
  profilePic: { type: String, default: null },
  numFollowers: { type: Number, default: 0 },
  numFollowing: { type: Number, default: 0 },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  streakCount: { type: Number, default: 0 },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
  lastPostDate: { type: Date, default: null },
});

//will automatically use the connection without needing to reconnect
const User = mongoose.model("userprofiles", userSchema);

export default User;
