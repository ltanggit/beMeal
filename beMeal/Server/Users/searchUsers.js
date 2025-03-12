import User from './userSchema.js';

export const searchUsers = async (req, res) => {

    try{
    const userSearch = req.body.search; //grab the actual user being searched for 
    const userID = req.body.userID; //your userID to check if you are following them 
    const matchingUsers = await User.find({'userName': {$regex: userSearch}}, {'_id': 0, 'userName': 1, 'profilePic': 1, 'followers': 1, 'userID': 1})

    //use matchingUsers to return an array that is just userName, profilePic, and isFollowing
    //map function returns an array with a specific transformation to each entry
    //this transformation is to create new json
    const matchUsersWithIfFollowing = matchingUsers.map(user => (
        {
            userName: user.userName,
            profilePic: user.profilePic, 
            following: user.followers.includes(userID),
            userID: user.userID
        })
    );
    res.status(200).json({'users': matchUsersWithIfFollowing});
    } catch (error){
        console.error("Error finding matching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}