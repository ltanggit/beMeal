import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../components/EditProfile"
import { GalleryItem } from "../components/GalleryItem"
import Header from '../components/Header';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCloseClick = () => {
    setIsEditing(false); 
  }

  return (
    <>
    <div className="bg-black min-h-screen w-screen text-white p-4">
      <Header/>
      <div className="flex flex-col items-center pt-10">
        <div className="flex flex-row gap-8">
          {/*profile picture*/}
          <img 
            className="w-32 h-32 rounded-full object-cover"
            src="https://www.gravatar.com/avatar/?d=mp"
            alt="profile-picture"
          />

          {/*info container*/} 
          <div className="pt-8">
            <div className="font-semibold">
              <h2 className="text-lg">first last</h2>
              <h3>@username</h3>
            </div>

            {/*stats section*/}
            <div className="flex flex-row gap-4 pt-3">
              <button
                className="bg-white text-black hover:bg-gray-200 rounded-lg w-[14vw]"
                  onClick={handleEditClick}>
                  edit profile
              </button>
              <p className="pt-2">followers: xx</p>
              <p className="pt-2">following: xx</p>
            </div>
            </div>
        </div>

        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="p-6 rounded-lg shadow-lg transform scale-90 opacity-100 transition-all duration-300 ease-out animate-popup">
              <EditProfile onClose={handleCloseClick}/>
            </div>
          </div>
        )}
      </div>
      {/*Gallery Section*/}
      <div>
        <div className="flex justify-center pt-20">
          <div className="grid grid-cols-4 gap-6">
            <GalleryItem/>
            <GalleryItem/>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
    </>
  );
}
