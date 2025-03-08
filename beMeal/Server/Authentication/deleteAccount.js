import Account from "./accountSchema.js";
import User from "../Users/userSchema.js";
import cloudinary from "../cloudinaryUsers.js";

export const deleteAccount = async (req, res) => {
  try {
    const { userID } = req.body;

    // Find account by userName
    const account = await Account.findOne({ userID });
    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    await cloudinary.uploader.destroy(account._id.toString());

    await User.deleteOne({'userID': account._id});
    res.status(200).json({ message: "User deleted" });

    await Account.deleteOne({ userID });
    res.status(200).json({ message: "Account deleted" }); 

    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};