import Account from "./accountSchema.js";

export const updatePassword = async (req, res) => {
  try {
    const { userID, password } = req.body;

    // Find account by userName
    const account = await Account.findOne({ 'userID': userID });
    // if account does not exist, return error
    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    // Validate NEW password
    if (account.password === password) {
      return res.status(400).json({ error: "New password must be different" });
    }

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
    const passWord = await account.findOneAndUpdate({'id_': userID}, { $set: {'password': password} }, {new : true});
    console.log('account password saved');

    if(!passWord){
      return res.status(404).json( {error : "error updating password in account" });
    }

} catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};