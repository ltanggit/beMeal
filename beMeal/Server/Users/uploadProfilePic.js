import cloudinary from '../cloudinaryUsers.js';

//import the userSchema and where the photos are being held

export const uploadProfilePic = async (req, res) => {
    try{
    const userID = req.body.userID; //grab the userID to deal with this 
    const filepath = req.body.filepath; //grab the filepath for uploading
    //upload to cloudinary
    const uploadImage = await cloudinary.uploader.upload(filepath, {folder: 'profile_pictures', //put into profile_pictures folder
        width: 300, // Resize image can mess with later
        height: 300,
        crop: 'fill', // Crop to fit dimensions
        gravity: 'face', // Center on face if possible
        quality: 'auto',
        fetch_format: 'auto',
        public_id: userID.toString()});
    console.log('uploaded image');

    //pass the image url to the front end
    res.status(200).json({'Image URL': uploadImage.secure_url});

    } catch (error){
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}