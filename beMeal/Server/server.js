import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js"; // Import your MongoDB connection setup
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js"; //import the routes for the user
import postRoutes from "./Routes/postRoutes.js";

dotenv.config({ path: "../.env" });

//if processs.env.PORT is defined then the app uses this value if not it will use 5050, this is a good way to set a default value
const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());

//so it can parse json coming in
app.use(express.json());

//use the userRoutes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Connect to MongoDB and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
