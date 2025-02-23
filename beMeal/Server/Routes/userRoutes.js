import express from 'express';
import { createUser } from '../Users/createUser.js';

const router = express.Router();

router.post('/createUser', createUser); //the post request calls the createUser function

export default router;