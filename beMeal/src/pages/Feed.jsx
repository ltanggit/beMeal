import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5050/posts/getFeed/${user.userID}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch feed");
        }
        const data = await response.json();

        const updatedPosts = await Promise.all(
          data.map(async (post) => {
            try {
              const token = localStorage.getItem("token");
              const res = await axios.put(
                "http://localhost:5050/users/searchUsers",
                {
                  search: post.username, 
                  userID: user.userID,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
              if (res.data.users && res.data.users.length > 0) {
                post.profilePic = res.data.users[0].profilePic;
              } else {
                post.profilePic = "/fallback-profile-pic.png";
              }
            } catch (err) {
              console.error("Error fetching profilePic for post user:", err);
              post.profilePic = "/fallback-profile-pic.png";
            }
            return post;
          })
        );

        setPosts(updatedPosts);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return <div>Please log in to view posts.</div>;
  }

  const nextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white flex flex-col items-center">
      <Header />
      <div className="flex items-center justify-center mt-6 space-x-4">
        <button onClick={prevPost} className="p-4 text-5xl">⬅️</button>

        <div className="relative w-[30vw] h-[80vh] flex flex-col items-center bg-black border-2 border-gray-700 p-4 rounded-3xl shadow-lg">
          {posts.length > 0 ? (
            <>
              <div className="flex items-center mb-2">
                <img 
                  src={posts[currentIndex].profilePic} 
                  alt={`${posts[currentIndex].username}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-2 font-semibold">
                  {posts[currentIndex].username}
                </span>
              </div>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={posts[currentIndex].image}
                  alt="Post"
                  className="w-full h-full object-cover rounded-3xl object-center"
                />
              </div>
              {posts[currentIndex].caption && (
                <p className="mt-2 text-center">{posts[currentIndex].caption}</p>
              )}
            </>
          ) : (
            <p className="text-center">No posts available.</p>
          )}
        </div>

        <button onClick={nextPost} className="p-4 text-5xl">➡️</button>
      </div>
    </div>
  );
}
