import express from 'express';
import { updateUser } from '../Users/updateUser.js';
import { getFollowing } from '../Users/getFollowing.js';
import { follow } from '../Users/updateFollowing.js';
import { unfollow } from '../Users/updateFollowing.js';
import { getUser } from '../Users/getUser.js';
import { searchUsers } from '../Users/searchUsers.js';
import { authMiddleware } from "../Authentication/middleware.js";

const router = express.Router();

router.put('/updateUser', authMiddleware, updateUser); //create the putt for updating a user
router.get('/getFollowing', authMiddleware, getFollowing); //create the get request to get followers
router.put('/follow', authMiddleware, follow); //create put for following a user 
router.put('/unfollow', authMiddleware, unfollow); //create put for unfollowing a user
router.get('/getUser', authMiddleware, getUser); //create get to get users information
router.get('/searchUsers',authMiddleware, searchUsers); //create get to ge all the matching userNames


export default router;