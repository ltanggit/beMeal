import express from 'express';
import { createUser } from '../Users/createUser.js';
import { updateUser } from '../Users/updateUser.js';
import { getFollowing } from '../Users/getFollowing.js';
import { follow } from '../Users/updateFollowing.js';
import { unfollow } from '../Users/updateFollowing.js'

const router = express.Router();

router.post('/createUser', createUser); //the post request calls the createUser function
router.put('/updateUser', updateUser); //create the putt for updating a user
router.get('/getFollowing', getFollowing); //create the get request to get followers
router.put('/follow', follow); //create put for following a user 
router.put('/unfollow', unfollow); //crete put for unfollowing a user


export default router;