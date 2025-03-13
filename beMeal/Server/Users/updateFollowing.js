import User from './userSchema.js'; //import the user schema

//make functionality to follow someone
export const follow = async (req, res) => {
    try{

        //grab your userID as well as the userID of the person you are trying to follow
        const userFollow = req.body.userFollow;
        const myID = req.body.userID; 

        //must send you your userID and the userID of the person you are trying to follow
        if(!userFollow){
            return res.status(400).json( {error: 'must supply a user to follow' });
        }

        if(!myID){
            return res.status(400).json( {error: 'must supply a myID' });
        }

        //update the person you are trying to follow by adding you as a follower
        const Followers = await User.findOneAndUpdate({'userID':userFollow},
            {
                $inc: { 'numFollowers': 1},
                $push: { 'followers': myID}

            },
            {new : true});

         if(!Followers){
            return res.status(404).json({ error: "User trying to follow is not found" });
         }  

        //update your following to include the person you are trying to follow
        const Following = await User.findOneAndUpdate({'userID': myID}, {
            $inc: { 'numFollowing': 1},
            $push: {'following': userFollow }
            }, 
            {new : true});

        if (!Following){
            return res.status(404).json({error: "User that is trying to follow someone is not found"});
        }

        res.status(200).json({'myStuff': {'numFollowing': Following.numFollowing}})

    }catch (error){
        console.error('Error following:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//make functionality to follow someone
export const unfollow = async (req, res) => {
    try{

        //grab your userID as well as the userID of the person you are trying to follow
        const userUnfollow = req.body.userUnfollow;
        const myID = req.body.userID; 

        //must send you your userID and the userID of the person you are trying to follow
        if(!userUnfollow){
            return res.status(400).json( {error: 'must supply a user to unfollow' });
        }

        if(!myID){
            return res.status(400).json( {error: 'must supply a myID' });
        }

        // Check if both users exist before making updates
        const userToUnfollow = await User.findOne({ userID: userUnfollow });
        const currentUser = await User.findOne({ userID: myID });
        if(!userToUnfollow){
            return res.status(404).json({ error: "User trying to unfollow someone they are not currently following" });
         }  

        if (!currentUser.following.includes(userUnfollow)){
            return res.status(400).json({error: "You are not following this person"});
        }

        if(!currentUser){
            return res.status(404).json({ error: "Current user not found" });
         }  


        //update the person you are trying to follow by adding you as a follower
        const unfollow = await User.findOneAndUpdate({'userID':userUnfollow},
            {
                $inc: { 'numFollowers': -1},
                $pull: { 'followers': myID}

            },
            {new : true}
         );

        //update your following to include the person you are trying to follow
        const Following = await User.findOneAndUpdate({'userID': myID}, {
            $inc: { 'numFollowing': -1},
            $pull: {'following': userUnfollow }
            },
            {new : true}
        );

        res.status(200).json({'myStuff': {'numFollowing': Following.numFollowing}});

    }catch (error){
        console.error('Error unFollowing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}