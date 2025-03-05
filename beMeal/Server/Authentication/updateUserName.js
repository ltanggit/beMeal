import Account from "./accountSchema.js";

export const updateUserName = async (req, res) => {
  try {
    const { userID, userName } = req.body;

    // Find account by userID
    const account = await Account.findOne({ userID });
    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    // Validate NEW userName
    if (account.userName === userName) {
      return res.status(400).json({ error: "New username must be different" });
    }
    const accountExists = await Account.findOne({ userName });
    if (accountExists) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Update userName
    account.userName = userName;
    await account.save();
    res.status(200).json({ message: "Username updated" });

} catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
