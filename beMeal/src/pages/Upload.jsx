import { useState, useEffect } from "react";
import Header from '../components/Header';
import UploadImage from '../assets/upload.png';
import { useAuth } from "../context/AuthContext";

export default function Upload() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [message, setMessage] = useState(""); // Message if the window is closed or not open yet

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
        body: JSON.stringify({ userID: user.userID }),
      });

      if (!userResponse.ok) throw new Error("Failed to fetch user data");

      const userData = await userResponse.json();
      setUsername(userData.userInfo.userName);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load profile data");
    }
  };

  // Fetch time left from the backend
  useEffect(() => {
    const fetchTimeLeft = async () => {
      try {
        const response = await fetch("http://localhost:5050/streak/getTimeLeft");
        const data = await response.json();

        if (response.ok) {
          setTimeLeft(data.timeLeft); // Set countdown time
          setMessage(""); // Reset message if window is open
        } else {
          setMessage(data.message || "Streak window not available");
          setTimeLeft(null); // Don't show the countdown
        }

      } catch (error) {
        console.error("Error fetching time left:", error);
        setMessage("Failed to load timer");
      }
    };

    fetchTimeLeft(); // Fetch immediately

    let interval;
    if (timeLeft) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (!prevTime) return null;

          const [hh, mm, ss] = prevTime.split(":").map(Number);
          let totalSeconds = hh * 3600 + mm * 60 + ss - 1;

          if (totalSeconds <= 0) {
            clearInterval(interval);
            setMessage("Streak window has closed");
            return null;
          }

          const newHours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
          const newMinutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
          const newSeconds = String(totalSeconds % 60).padStart(2, '0');

          return `${newHours}:${newMinutes}:${newSeconds}`;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeLeft]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
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
      const uploadResponse = await fetch("http://localhost:5050/posts/createPost", {
        method: "POST",
        body: formData,
        headers: { "Authorization": `Bearer ${user.token}` },
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload post");

      alert("Post uploaded successfully!");

      // Call updateStreak function after successful upload
      await updateStreak();
      
      setSelectedFile(null);
      setCaption("");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Error uploading post. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateStreak = async () => {
    try {
      const response = await fetch("http://localhost:5050/users/updateStreak", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userID: user.userID }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update streak");
      }
  
      if (data.message) {
        alert(data.message); // "Streak already counted for this window" or success message
      } else {
        alert(`Streak updated! Current streak: ${data.streakCount}`);
      }
  
    } catch (error) {
      console.error("Error updating streak:", error);
      alert("Could not update streak. Try again later.");
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen text-white p-4 relative flex flex-col">
      <Header />
      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="flex justify-center items-center mb-5 bg-yellow-400 text-black rounded-2xl h-[5vh] w-[22vw] shadow-lg border-2 border-yellow-500 animate-bounce">
          <p className="font-semibold text-lg"> {message ? message : `⏳ Time Left to Upload: ${timeLeft} ⏳`} </p>
        </div>
        <div className="text-gray-400 bg-[#1a1a1a] p-3 rounded-2xl shadow-md w-[50%] h-[70vh]">
          <div className="flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-400 p-5 w-[100%] h-[100%]">
            <h1 className="text-2xl font-bold text-center text-white mb-20">
              Capture the moment. Share your meal.
            </h1>
            <img src={UploadImage} className="w-[4vw]" />
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="mt-8 bg-white text-black hover:bg-gray-200 rounded-lg w-[10vw]"
            >
              Choose Image
            </button>
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
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Post"}
            </button>
            <p className="mt-2 text-gray-500 text-sm">Click to post your latest meal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}