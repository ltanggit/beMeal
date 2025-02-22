import connectToDataBase from '../db.js';

export const createUser = async (req,res) => {
    try{

    } catch (error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}