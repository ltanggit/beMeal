import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';


// Use path.resolve for proper .env file path
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.AVA_MONGODB_KEY;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function connectToDatabase() {
  try {
    console.log(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    // Ping to confirm a successful connection
    await client.db('UserProfiles').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export { connectToDatabase};