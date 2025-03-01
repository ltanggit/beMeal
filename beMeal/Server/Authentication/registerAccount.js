import Account from "./accountSchema.js";
import User from "./userSchema.js"; // Import user schema to link accounts

export const registerAccount = async (req, res) => {
  try {
    const { userID, userName, password } = req.body;

    // Check if user already exists
    const existingAccount = await Account.findOne({ userName });
    if (existingAccount) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Check if a user profile exists for the userID
    const existingUser = await User.findOne({ userID });
    if (!existingUser) {
      return res.status(400).json({ error: "User profile does not exist" });
    }

    // Create new account
    const newAccount = new Account({ userID, userName, password });
    await newAccount.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error registering account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
