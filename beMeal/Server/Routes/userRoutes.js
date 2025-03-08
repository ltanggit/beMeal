import express from 'express';
import { updateBio } from '../Users/updateBio.js';
import { getFollowing } from '../Users/getFollowing.js';
import { follow } from '../Users/updateFollowing.js';
import { unfollow } from '../Users/updateFollowing.js';
import { getUser } from '../Users/getUser.js';
import { searchUsers } from '../Users/searchUsers.js';
import { uploadProfilePic } from '../Users/uploadProfilePic.js';

const router = express.Router();

//need to hold pictures temporarily

router.put('/updateBio', updateBio); //create to update a bio
router.get('/getFollowing', getFollowing); //create the get request to get followers
router.put('/follow', follow); //create put for following a user 
router.put('/unfollow', unfollow); //create put for unfollowing a user
router.get('/getUser', getUser); //create get to get users information
router.get('/searchUsers', searchUsers); //create get to ge all the matching userNames
router.put('/uploadProfilePic', uploadProfilePic); //upload profile pic


export default router;