import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../components/EditProfile"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <div>
      <EditProfile/>
    </div>
    )
  }
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/*profile header*/}
      <div className="profile-header">
        <img 
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="profile-picture"
        />
        <div>
          <h1>username</h1>
          <p> user bio </p>
        </div>
        <button
          onClick={handleEditClick}>
          edit
        </button>
      </div>

      {/*stats section*/}
      <div className="stats-section">
        <div>
          <p>posts</p>
        </div>
        <div>
          <p>followers</p>
        </div>
        <div>
          <p>following</p>
        </div>
      </div>

      {/*gallery*/}
    </div>
  );
}
