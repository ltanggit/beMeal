import Account from "./accountSchema.js";
import User from "../Users/userSchema.js";
import cloudinary from "../cloudinaryUsers.js";

export const deleteAccount = async (req, res) => {
  try {
    const { userID } = req.body;

    // Find account by userName
    const account = await Account.findOne({ '_id': userID });

    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    console.log(account._id.toString());
    console.log(userID);

    const delImage = await cloudinary.uploader.destroy("profile_pictures/" + account._id.toString());

    if (delImage.result === 'not found') {
      return res.status(404).json({ error: "image not deleted" });
    }

    console.log("image deleted")

    const userDeleted = await User.deleteOne({'userID': account._id});

    console.log('User deleted');
    if (!userDeleted){
      return res.status(404).json({ error: "user does not exist" });
    }

    const accountDeleted = await Account.deleteOne({ userID });

    if (!accountDeleted){
      return res.status(404).json({ error: "Account does not exist" });
    }
    res.status(200).json({ message: "Account deleted" }); 

    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};