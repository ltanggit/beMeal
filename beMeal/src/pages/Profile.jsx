import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../components/EditProfile"


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCloseClick = () => {
    setIsEditing(false); 
  }

  // if (isEditing) {
  //   return (
  //     <div>
  //     <button
  //       onClick={handleCloseClick}>
  //       x
  //     </button>
  //     <EditProfile/>
  //   </div>
  //   )
  // }
  

  return (
    <div className="profile-container">
      <h1>welcome 'first-name'</h1>
      {/*profile header*/}
      <div className="profile-header">
        <img 
          className="profile-picture"
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="profile-picture"
        />

        <div className="profile-info">
          <h2>username</h2>
          <p>bio</p>
        </div>

        {/*stats section*/}
        <div className="stats-section">
          <div>
            <p>posts: </p>
          </div>
          <div>
            <p>followers: </p>
          </div>
          <div>
            <p>following: </p>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button
          onClick={handleEditClick}>
          edit
        </button>
      </div>

      {isEditing && (
        <div className="edit-popup">
          <div className="edit-profile-box">
            <EditProfile />
          </div>

          <button 
            className="close-button" 
            onClick={handleCloseClick}>
              cancel
            </button>
            <button
            className="save">
              save
            </button>
        </div>
      )}

      {/*gallery*/}
    </div>
  );
}
