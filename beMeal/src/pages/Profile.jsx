import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../components/EditProfile"
import { GalleryItem } from "../components/GalleryItem"


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
    <div className="bg-[#1A1A1A] min-h-screen w-screen text-white">
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
                  onClick={handleEditClick}>
                  edit profile
              </button>
              <p className="pt-2">followers: </p>
              <p className="pt-2">following: </p>
            </div>
            </div>
        </div>

        {isEditing && (
          <div className="">
            <div className="edit-profile-box">
              <EditProfile />
            </div>

            <button 
              className="" 
              onClick={handleCloseClick}>
                cancel
              </button>
              <button
                className="">
                save
              </button>
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
