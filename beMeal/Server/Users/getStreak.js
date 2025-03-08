import User from './userSchema.js';

export const getStreak = async (req, res) => {
    try{
        //parse the userID
        const userID = { 'userID': req.body.userID };

        //because truthy of the entire object is always true 
        if(!userID.userID){
            return res.status(400).json({error: 'UserID is required'})
        }

        //get the userStreak
        const streakCount = await User.findOne(userID).select({'streakCount' : 1,  '_id': 0});
        if(!streakCount){
            return res.status(404).json({error:'user not found'})
        }
        console.log('Got streak count');
        res.status(200).json(streak);

    } catch(error){
        console.error('Error getting streakCount:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}