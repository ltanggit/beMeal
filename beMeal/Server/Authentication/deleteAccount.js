import Account from "./accountSchema.js";

export const deleteAccount = async (req, res) => {
  try {
    const { userName } = req.body;

    // Find account by userName
    const account = await Account.findOne({ userName });
    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    await Account.deleteOne({ userName });
    res.status(200).json({ message: "Account deleted" }); 

    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};