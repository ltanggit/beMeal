import express from 'express';
import { updateUser } from '../Users/updateUser.js';
import { getFollowing } from '../Users/getFollowing.js';
import { follow } from '../Users/updateFollowing.js';
import { unfollow } from '../Users/updateFollowing.js';
import { getUser } from '../Users/getUser.js';
import { searchUsers } from '../Users/searchUsers.js';

const router = express.Router();

router.put('/updateUser', updateUser); //create the putt for updating a user
router.get('/getFollowing', getFollowing); //create the get request to get followers
router.put('/follow', follow); //create put for following a user 
router.put('/unfollow', unfollow); //create put for unfollowing a user
router.get('/getUser', getUser); //create get to get users information
router.get('/searchUsers', searchUsers); //create get to ge all the matching userNames


export default router;