import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userID: { type: String, required: true, index: true },
  userName: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true},
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
