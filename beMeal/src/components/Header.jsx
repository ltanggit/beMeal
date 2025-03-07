import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/search-icon.png'

export default function Header() {
  const navigate = useNavigate();

  const [showBar, setShowBar] = useState(false); 

  return (
    <div className="w-full bg-black text-white">
      <div className="flex items-center justify-center relative p-6 pb-10">
        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          BeMeal
        </h1>
        {/*Log Out, Search*/}
        <div className="flex gap-4 absolute left-4">
          <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg bg-black border-2 border-gray-700 rounded-3xl hover:bg-gray-900 transition"
            >
              Log Out
          </button>
          <div className="relative">
            {showBar ? (
              <input
                type="text"
                className="text-gray-400 bg-[#1a1a1a] w-70 p-2 pl-4 text-white rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                placeholder="Search users..."
                onBlur={() => setShowBar(false)}
                autoFocus
              />
            ) : (
              <button
                onClick={() => setShowBar(true)}
                className="p-2 rounded-full hover:bg-gray-800 transition"
              >
                <img src={SearchIcon} alt="Search" className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>
        {/*Feed, Post, Profile Buttons*/}
        <div className="flex gap-4 absolute right-4">
          <button 
            onClick={() => navigate('/Feed')} 
            className="bg-white text-black px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
          >
            Feed
          </button>
          <button 
            onClick={() => navigate('/Upload')} 
            className="bg-white text-black px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
          >
            Post
          </button>
          <button 
            onClick={() => navigate('/Profile')} 
            className="bg-white text-black px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
          >
            Profile
          </button>
        </div>
      </div>
      <div className="border-b border-gray-700 w-full mb-4"></div> 
    </div>
  );
}
