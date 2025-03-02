import express from 'express';
import { createUser } from '../Users/createUser.js';
import { updateUser } from '../Users/updateUser.js';
import { getFollowing } from '../Users/getFollowing.js';

const router = express.Router();

router.post('/createUser', createUser); //the post request calls the createUser function
router.put('/updateUser', updateUser); //create the post for updating a user
router.get('/getFollowing', getFollowing); //create the get request to get followers


export default router;