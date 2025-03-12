import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function EditProfile({ onClose }) {
    const { user } = useAuth();

    const [profileData, setProfileData] = useState({
        username: "",
        password: "",
        bio: "",
        profilePic: null
    });

    const [originalData, setOriginalData] = useState({
        username: "",
        bio: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5050/users/getUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userID: user.userID,
                }),
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            
            const userData = await response.json();
            console.log(userData);
            
            // set current values
            setProfileData({
                username: userData.userInfo.userName,
                password: "",  // Don't show actual password
                bio: userData.userInfo.bio,
                profilePic: userData.userInfo.profilePic
            });
            
            // set original values for change detection
            setOriginalData({
                username: userData.userInfo.userName,
                bio: userData.userInfo.bio,
            });
            
            setImagePreview(userData.userInfo.profilePic);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to load profile data");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    };
        
    const handleSaveClick = async () => {
        try {
            if (profileData.bio !== originalData.bio) {
                const bioResponse = await fetch(`http://localhost:5050/users/updateBio`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        bio: profileData.bio,
                    }),
                });
        
                if (!bioResponse.ok) {
                    throw new Error("Failed to change user bio");
                }
            }
    
            if (profileData.username !== originalData.username && profileData.username.trim() !== '') {
                const usernameResponse = await fetch(`http://localhost:5050/accounts/updateUserName`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        userName: profileData.username,
                    }),
                });

                const usernameData = await usernameResponse.json();
    
                if (!usernameResponse.ok) {
                    throw new Error(usernameData.error);
                }
            }

            if (profileData.password.trim() !== '') {
                const passwordResponse = await fetch(`http://localhost:5050/accounts/updatePassword`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        userID: user.userID,
                        password: profileData.password,
                    }),
                });

                const passwordData = await passwordResponse.json();

                if (!passwordResponse.ok) {
                    throw new Error(passwordData.error);
                }
            }
    
            if (selectedImage) {
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
                        onChange={handleFileChange} 
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
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>

                {/*Inputs*/}
                <div className="flex flex-col items-center mt-4" >
                    <div className="flex flex-col">
                          
                         <label>New Username: </label>
                        <input
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                            name="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                        />
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Password: </label>
                        <input
                        className="bg-[#333] text-white border border-gray-600 rounded-lg"
                        name="password"
                        value={profileData.password}
                        onChange={handleInputChange}
                        />
                        
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Bio: </label>
                        <textarea
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
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