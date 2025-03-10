import express from 'express';
import multer from "multer";
import { updateBio } from '../Users/updateBio.js';
import { getFollowing } from '../Users/getFollowing.js';
import { follow } from '../Users/updateFollowing.js';
import { unfollow } from '../Users/updateFollowing.js';
import { getUser } from '../Users/getUser.js';
import { searchUsers } from '../Users/searchUsers.js';
import { authMiddleware } from "../Authentication/middleware.js";
import { uploadProfilePic } from '../Users/uploadProfilePic.js';

const router = express.Router();

//need to hold pictures temporarily
const upload = multer({dest: 'uploads/'})

router.put('/updateBio', authMiddleware, updateBio); //create to update a bio
router.put('/getFollowing', authMiddleware, getFollowing); //create the get request to get followers
router.put('/follow',authMiddleware, follow); //create put for following a user 
router.put('/unfollow', authMiddleware, unfollow); //create put for unfollowing a user
router.post('/getUser', authMiddleware, getUser); //create get to get users information
router.put('/searchUsers', authMiddleware, searchUsers); //create get to ge all the matching userNames
router.put('/uploadProfilePic', authMiddleware, upload.single('file'), uploadProfilePic); //upload profile pie

export default router;