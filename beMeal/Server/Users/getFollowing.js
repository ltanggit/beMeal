import User from './userSchema.js';

export const getFollowing = async (req, res) => {
    try{
        //parse the userID
        const userID = { 'userID': req.body.userID };

        //because truthy of the entire object is always true 
        if(!userID.userID){
            return res.status(400).json({error: 'UserID is required'})
        }

        //get the userInfo
        const following = await User.findOne(userID).select({'following' : 1,  '_id': 0});
        if(!following){
            return res.status(404).json({error:'user not found'})
        }
        console.log('Got following');
        res.status(200).json(following);

    } catch(error){
        console.error('Error getting following:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}