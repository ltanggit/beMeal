import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

//cloudinary account details for post images
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

//ask about the two cloudinary files
