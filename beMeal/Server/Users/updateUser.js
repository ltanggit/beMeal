import User from './userSchema.js'; 

export const updateUser = async (req, res) => {

    try {

    //this should not be used for adding a follower
    if (req.body.followers || req.body.following || req.body.numFollowing || req.body.numFollowers){
        return res.status(400).json({ error: 'Can no update followers or following with this route' });
    }

    //expecting the req to hold userID
    const userID = {'userID': req.body.userID}; //grab the userID in JSON format
    let toUpdate = {...req.body} //create a shallow copy dont want to mess with req
    delete toUpdate.userID //delete userID to only get the value that needs to be updated
    const userInfo = await User.findOneAndUpdate(userID, { $set: toUpdate }, {new : true}); // using Mongoose to update this person
    if (!userInfo){ //if no user throw an error
        return res.status(404).json({ error: "User not found" });
    }
    console.log('Updated User')
    res.status(200).json(userInfo); //have it send back the userInfo  
} catch (error){
         // Handle duplicate key error (MongoDB error code 11000)
         // This is for userName updates, this enforces them being unique
         if (error.code === 11000 && error.keyPattern.userName) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}