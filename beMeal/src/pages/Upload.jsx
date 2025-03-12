import { useState, useEffect } from "react";
import Header from '../components/Header';
import UploadImage from '../assets/upload.png'
import { useAuth } from "../context/AuthContext";

export default function Upload() {
const { user } = useAuth();
const [selectedFile, setSelectedFile] = useState(null);
const [caption, setCaption] = useState("");
const [uploading, setUploading] = useState(false);
const [username, setUsername] = useState("");
const [error, setError] = useState("");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
}

useEffect(() => {
  if (user) {
      fetchUserData();
  }
}, [user]);

const fetchUserData = async () => {
  try {
    const userResponse = await fetch(`http://localhost:5050/users/getUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
            userID: user.userID,
        }),
  });

  if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
  }

  const userData = await userResponse.json();

  setUsername(userData.userInfo.userName);

  } catch (err) {
    console.error("Error fetching user data:", err);
    setError("Failed to load profile data");
    }
  };

const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image.");
    return;
  }

  setUploading(true);

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("caption", caption);
  formData.append("userID", user.userID);
  formData.append("username", username);
    
  try {
    console.log("here");
    const uploadResponse = await fetch("http://localhost:5050/posts/createPost", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${user.token}`,
      },
    });

    console.log(uploadResponse)

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload post");
    }

    const postData = await uploadResponse.json();
    alert("Post uploaded successfully!");
    setSelectedFile(null);
    setCaption("");
  } catch (error) {
    console.error("Error uploading post:", error);
    alert("Error uploading post. Please try again.");
  } finally {
    setUploading(false);
  }
}

  return (
    <div className="bg-black min-h-screen w-screen text-white p-4 relative flex flex-col">
      <Header/>
      <div className="flex flex-grow justify-center items-center">
        <div className='text-gray-400 bg-[#1a1a1a] p-3 rounded-2xl shadow-md w-[50%] h-[70vh]'>
          <div className="flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-400 p-5 w-[100%] h-[100%]">
            <h1 className="text-2xl font-bold text-center text-white mb-20">
              Capture the moment. Share your meal.
            </h1>
            <img src={UploadImage} className="w-[4vw]"/>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
            <button
              onClick={() => document.getElementById('fileInput').click()}
              className="mt-8 bg-white text-black hover:bg-gray-200 rounded-lg w-[10vw]">Choose Image</button>
            {selectedFile && <p className="mt-6 text-[#4CAF50] text-sm">Selected file: {selectedFile.name}</p>}
            <input
              type="text"
              placeholder="Add a caption..."
              className="bg-[#333] text-white border border-gray-600 rounded-lg mt-5"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <button
              onClick={handleUpload}
              className={`mt-6 bg-blue-500 text-white hover:bg-blue-700 rounded-lg w-[10vw] ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={uploading}>
              {uploading ? "Uploading..." : "Post"}
           </button>
            <p className="mt-2 text-gray-500 text-sm">Click to post your lastest meal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
