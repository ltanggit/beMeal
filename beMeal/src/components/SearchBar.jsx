import { useState } from "react";
import SearchIcon from "../assets/search-icon.png";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SearchBar() {
  const { user } = useAuth();
  const currID = user?.userID;
  const [showBar, setShowBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //   console.log(currID);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchText(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      //because of authMiddleware for searchUsers, need to authorize with token
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5050/users/searchUsers",
        {
          search: query,
          userID: currID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-79">
      {showBar ? (
        <div className="absolute w-full bg-[#1a1a1a] text-white shadow-md rounded-lg">
          <input
            type="text"
            className="text-gray-400 bg-[#1a1a1a] w-80 p-2 pl-4 text-white rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => handleSearch(e)}
            onBlur={() => setShowBar(false)}
            autoFocus
          />
          <ul className="w-full mt-2 max-h-70 overflow-y-auto">
            {searchResults.length === 0 && searchText.length > 0 && (
              <li className="text-gray-400 p-2">No user matches...</li>
            )}
            {searchResults.map((user) => (
              <li
                key={user.userID}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <img
                  src={user.profilePic}
                  alt="profilepic"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.userName}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setShowBar(true)}
          className="p-2 rounded-full hover:bg-gray-800 transition"
        >
          <img src={SearchIcon} alt="Search" className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
