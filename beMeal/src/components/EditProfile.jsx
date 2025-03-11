import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function EditProfile({ onClose }) {
    const { user } = useAuth();

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");

    const [usernameChange, setUsernameChange] = useState(false);
    const [bioChange, setBioChange] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [profilePicChange, setProfilePicChange] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userProfile = await fetch(`http://localhost:5050/users/getUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userID: user.userID,
                }),
            });
            const userData = await userProfile.json(); 
            setImagePreview(userData.userInfo.profilePic);  
            setUsername(userData.userInfo.userName);  
            setPassword(userData.userInfo.password);
            setBio(userData.userInfo.bio);    
        }
        fetchUserData();
    }
    }, [user]);

// don't call the apis when nothing has changed 
    const handleProfileChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === "username") {
            setUsername(value);
            setUsernameChange(true);  
        }
        if (name === "bio") {
            setBio(value);
            setBioChange(true); 
        }
        if (name === "password") {
            setPassword(value);
            setPasswordChange(true);  
        }
        
        if (files) {
            const file = files[0];
            if (file) {
                setSelectedImage(file);
                const imageURL = URL.createObjectURL(file);
                setImagePreview(imageURL);
                setProfilePicChange(true);  
            }
        }
    }
    

    const handleSaveClick = async () => {
        try {
            if (bioChange) {
                const bioResponse = await fetch(`http://localhost:5050/users/updateBio`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        bio: bio,
                    }),
                });
        
                if (!bioResponse.ok) {
                    throw new Error("Failed to change user bio");
                }
            }
    
            if (usernameChange) {
                const usernameResponse = await fetch(`http://localhost:5050/accounts/updateUserName`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        userName: username,
                    }),
                });
    
                if (!usernameResponse.ok) {
                    throw new Error("Failed to change username");
                }
            }

            if (passwordChange) {
                const passwordResponse = await fetch(`http://localhost:5050/accounts/updatePassword`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        password: password,
                    }),
                });

                if (!passwordResponse.ok) {
                    throw new Error("Failed to change password");
                }
            }
    
            if (profilePicChange) {
                const form = new FormData()
                form.append('file', selectedImage);
                form.append('userID', user.userID)
                const picResponse = await fetch(`http://localhost:5050/users/uploadProfilePic`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: form,
                });
    
                if (!picResponse.ok) {
                    throw new Error("Failed to change profile picture");
                }
            }
    
            onClose();
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-400 bg-[#1a1a1a] p-8 rounded-2xl shadow-md w-140 text-left">
                <h1 className="text-white font-semibold text-lg text-center">Edit Profile</h1>
                {/*Profile Pictures*/}
                <div className="flex flex-col items-center space-y-4 mt-4">
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleProfileChange} 
                    />
                    
                    <img 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
                        src={imagePreview} 
                        alt="Profile"
                    />
                    <button 
                        className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-3 py-1"
                        onClick={() => document.getElementById('fileInput').click()} >
                        Change Profile Picture
                    </button>
                    {selectedImage && <p className="text-[#4CAF50] text-sm">Profile Picture Updated!</p>}
                </div>

                {/*Inputs*/}
                <div className="flex flex-col items-center mt-4" >
                    <div className="flex flex-col">
                          {error && <p className="text-red-500 mb-4">{error}</p>}
                         <label>New Username: </label>
                        <input
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                            name="username"
                            value={username}
                            onChange={handleProfileChange}
                        />
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Password: </label>
                        <input
                        className="bg-[#333] text-white border border-gray-600 rounded-lg"
                        name="password"
                        value={password}
                        onChange={handleProfileChange}
                        />
                        
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Bio: </label>
                        <textarea
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                            name="bio"
                            value={bio}
                            onChange={handleProfileChange}
                        />  
                    </div> 
                </div>
                <div className="flex justify-between w-full pt-6">
                    <button 
                     className="bg-white text-black hover:bg-gray-300 rounded-lg w-[9vw]" 
                     onClick={onClose}>
                     Cancel
                    </button>
                    <button
                     className="bg-white text-black hover:bg-gray-300 rounded-lg w-[9vw]"
                     onClick={handleSaveClick}>
                     Save
                    </button>
                </div>
            </div>
        </div>
    )
}