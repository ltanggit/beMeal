import Account from "./accountSchema.js";
import User from "../Users/userSchema.js"; // Import user schema to link accounts
import cloudinary from "../cloudinaryUsers.js"; //import the cloudinary api to use
import path from 'path';

export const registerAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if userName already exists
    const existingUserName = await Account.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already taken" });
    }

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

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Get the absolute path of the current directory (where registerAccount.js is)
const imagePath = path.join(__dirname, 'defaultImage.png');

    //when creating the account you also upload them a default image to be shown when they log in, and give them their image URL
    const uploadImage = await cloudinary.uploader.upload(imagePath, {folder: 'profile_pictures', //put into profile_pictures folder
            width: 300, // Resize image can mess with later
            height: 300,
            crop: 'fill', // Crop to fit dimensions
            gravity: 'face', // Center on face if possible
            quality: 'auto',
            fetch_format: 'auto',
            public_id: createdAccount._id.toString()});
    console.log('uploaded default image');

    //update the userImage url the correct url
    await User.findOneAndUpdate({'userID': createdAccount._id}, { $set: {profilePic: uploadImage.secure_url } });

    res.status(201).json({ message: "Account created successfully" });

    
  } catch (error) {
    console.error("Error registering account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
