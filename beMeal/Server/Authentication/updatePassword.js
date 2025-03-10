import Account from "./accountSchema.js";

export const updatePassword = async (req, res) => {
  try {
    const { userID, password } = req.body;

    // Find account by userID
    const account = await Account.findOne({ '_id': userID });

    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    // Validate NEW password
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

    // Update password
    account.password = password;
    await account.save();
    console.log("Password" + password + "updated for account" + account._id);
    res.status(200).json({ message: "Password updated" });

} catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};