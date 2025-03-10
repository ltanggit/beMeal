import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

//use .env file path 
// Use path.resolve for proper .env file path
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//must define it first before returning it as export default 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SKEY
});

export default cloudinary;