import mongoose from "mongoose";

const Schema = mongoose.Schema; //extracting Schema from mongoose making it easier to use

const userSchema = new Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  bio: { type: String, maxLength: 1000, default: "" },
  profilePic: { type: Buffer, default: null },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
});

//will automatically use the connection without needing to reconnect
const User = mongoose.model("userprofiles", userSchema);

export default User;
