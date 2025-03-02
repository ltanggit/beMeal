import Account from "./accountSchema.js";
import User from "../Users/userSchema.js"; // Import user schema to link accounts

export const registerAccount = async (req, res) => {
  try {
    const { userID, userName, password } = req.body;

    // Check if user already exists
    const existingUser = await Account.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }
    
    const existingID = await Account.findOne({ userID });
    if (existingID) {
      return res.status(400).json({ error: "User ID already taken" });
    }

    // Check if userName is valid
    if (userName.length < 3) {
      return res.status(400).json({ error: "User ID must be at least 3 characters" });
    }

    // Check if password is valid
    // // Check if password is at least 6 characters
    // if (password.length < 6) {
    //   return res.status(400).json({ error: "Password must be at least 6 characters" });
    // }
    // // Check if password has uppercase letter
    // if (!/[A-Z]/.test(password)) {
    //   return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
    // }
    // // Check if password has lowercase letter
    // if (!/[a-z]/.test(password)) {
    //   return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
    // }
    // // Check if password has number
    // if (!/[0-9]/.test(password)) {
    //   return res.status(400).json({ error: "Password must contain at least one number" });
    // }
    // // Check if password has special character
    // if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    //   return res.status(400).json({ error: "Password must contain at least one special character" });
    // }

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
    const newAccount = new Account({ userID, userName, password });
    await newAccount.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error registering account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
