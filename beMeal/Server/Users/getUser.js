import User from './userSchema.js';


export const getUser = async (req, res) => {
    try{
    const userID = req.body.userID;
    if (!userID){
        return res.status(400).json( {error: 'You must supple a userID'} );
    }

    const userInfo = await User.findOne({'userID': userID});
    if (!userInfo){
        return res.status(404).json( {error: 'User not found'} );
    }

    res.status(200).json( {userInfo} );

    } catch (error){
        console.error('Error unFollowing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}