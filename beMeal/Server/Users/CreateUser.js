import User from './userSchema.js';

export const createUser = async (req,res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        console.log('Created newUser')
        //return a good status because a User was succesfully made
        res.status(200).json({ message: 'User created successfully' });

    } catch (error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}