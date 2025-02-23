import {mongoose} from 'mongoose';
import dotenv from 'dotenv';


// Use path.resolve for proper .env file path
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.AVA_MONGODB_KEY;



async function connectToDatabase() {
  try {
    // switched to mongoose which automatically uses this connection
    await mongoose.connect(uri, { dbName: 'BeMeal' });
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export {connectToDatabase};