import Account from "./accountSchema.js";
import User from "../Users/userSchema.js";

export const updateUserName = async (req, res) => {
  try {
    const userID = req.body.userID;
    const newUserName = req.body.userName;

    // Find account by userID
    const account = await Account.findOne({ '_id': userID });
    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    // Validate NEW userName
    if (account.userName === newUserName) {
      return res.status(400).json({ error: "New username must be different" });
    }
    // Check if userName is valid
    if (newUserName.length < 3) {
      return res.status(400).json({ error: "User ID must be at least 3 characters" });
    }
    const accountExists = await Account.findOne({ 'userName': newUserName });
    if (accountExists) {
      return res.status(400).json({ error: "Username already taken" });
    }

    //update userName in Users
    const userExists = await User.findOne({'userID': userID});
    if (!userExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    await User.findOneAndUpdate( {'userID': userID}, { $set: {'userName': newUserName} }, {new : true}); 
    console.log('User userName updated');

    await Account.findOneAndUpdate({ '_id': userID}, { $set: {'userName': newUserName} }, {new : true} )

    res.status(200).json({ message: "Username updated" });

} catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
