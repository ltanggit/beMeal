import Account from "./accountSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find account by username
    const account = await Account.findOne({ userName });
    if (!account) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token (expires in 1 day)
    const token = jwt.sign(
      { userID: account._id, userName: account.userName },
      "your_jwt_secret",
      // { expiresIn: "1d" }
      { expiresIn: 3600} // 1 hour
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
