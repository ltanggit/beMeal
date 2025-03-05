import Account from "./accountSchema.js";
import User from "../Users/userSchema.js"; // Import user schema to link accounts

export const registerAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if userName already exists
    const existingUserName = await Account.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already taken" });
    }
    
    // const existingID = await Account.findOne({ userID });
    // if (existingID) {
    //   return res.status(400).json({ error: "User ID already taken" });
    // }

    // Check if userName is valid
    if (userName.length < 3) {
      return res.status(400).json({ error: "User ID must be at least 3 characters" });
    }

    // Check if password is valid
    const errors = [];

    if (password.length < 6) {
    errors.push("at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
    errors.push("at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
    errors.push("at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
    errors.push("at least one number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("at least one special character");
    }

    if (errors.length) {
    return res.status(400).json({ error: `Password must contain ${errors.join(", ")}` });
    }

    // Create new account
    const newAccount = new Account({ userName, password });
    await newAccount.save();

    // Create new user
    const createdAccount = await Account.findOne({ userName });
    const newUser = new User({ 
      "userID": createdAccount._id,
      "userName": createdAccount.userName
    });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error registering account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
