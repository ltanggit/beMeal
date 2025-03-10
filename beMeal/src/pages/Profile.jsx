import { useState, useEffect } from "react";
import { EditProfile } from "../components/EditProfile"
import { GalleryItem } from "../components/GalleryItem"
import { useAuth } from "../context/AuthContext";
import Header from '../components/Header';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useAuth();

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:5050/users/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userID: user.userID }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
      console.log(data)
      console.log(data.userInfo.userName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserPosts = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:5050/posts/getUserPosts/${user.userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user's posts");
      }

      const posts = await response.json();
      setUserPosts(posts);
      console.log("test hai hai");
      console.log(posts);
    } catch (error) {
      console.error("Error fetching user's posts:", error);
    }
  }

  // update when user changes 
  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [user]);
  
  // update when refresh changes
  useEffect(() => {
    fetchUserData();
  }, [refresh]);

  const handleCloseClick = () => {
    setIsAnimating(false);
    setIsEditing(false);
    setRefresh(prev => !prev);
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => setIsAnimating(true), 10);
  }

  return (
    <>
    <div className="bg-black min-h-screen w-screen text-white p-4 relative">
      <Header/>
      <div className="flex flex-col items-center pt-10">
        <div className="flex flex-row gap-8">
          {/*profile picture*/}
          <div className="flex flex-col items-center">
            <img 
              className="w-32 h-32 rounded-full object-cover"
              src={userData?.userInfo?.profilePic}
              alt="profile-picture"
            />
            <h3 className="bg-yellow-500 text-black font-bold rounded-lg shadow-lg w-4/5 mt-3.5">🔥 Streak: {userData?.userInfo?.streakCount}</h3>
          </div>

          {/*info container*/} 
          <div className="pt-8">
            <div className="font-semibold">
            <h3>@{userData?.userInfo?.userName}</h3>
            </div>
            <p>{userData?.userInfo?.bio}</p>

            {/*stats section*/}
            <div className="flex flex-col gap-4 pt-3">
              <div className="flex flex-row gap-4">
                <p className="pt-2">Followers: {userData?.userInfo?.numFollowers}</p>
                <p className="pt-2">Following: {userData?.userInfo?.numFollowing}</p>
              </div>
              <button
                className="bg-white text-black hover:bg-gray-200 rounded-lg w-[14vw]"
                  onClick={handleEditClick}>
                  Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/*Gallery Section*/}
      <div>
        <div className="flex justify-center pt-20">
          {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div className="grid grid-cols-4 gap-6" key={post._id}> 
              <GalleryItem image={post.image} caption={post.caption} likes={post.likeCount}/>
            </div>
             ))
            ) : (
              <p className="text-gray-500"> No posts avaliable. Time to post your first meal! 🍽️</p>
            )} 
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50">
          <div 
            className={`absolute inset-0 transition-all duration-300 
                       ${isAnimating ? 'backdrop-blur-sm' : 'backdrop-blur-none bg-opacity-0'}`}
          />
          
          <div className="flex items-center justify-center h-full w-full">
            <div 
              className={`p-6 rounded-lg shadow-lg z-50 relative
                        transition-all duration-300 ease-in-out
                        ${isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
              <EditProfile onClose={handleCloseClick}/>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}