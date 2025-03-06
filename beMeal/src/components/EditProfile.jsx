export function EditProfile({ onClose }) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-400 bg-[#1a1a1a] p-8 rounded-2xl shadow-md w-140 text-left">
                <h1 className="text-white font-semibold text-lg text-center">Edit Profile</h1>
                {/*Profile Pictures*/}
                <div className="flex flex-col items-center space-y-4 mt-4">
                    <img 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
                        src="https://www.gravatar.com/avatar/?d=mp" // Placeholder profile pic
                        alt="Profile"
                    />
                    <button 
                        className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-3 py-1">
                        Change Profile Picture
                    </button>
                </div>

                {/*Inputs*/}
                <div className="flex flex-col items-center mt-8" >
                    <div className="flex flex-col">
                         <label>New Username: </label>
                        <input
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                        />
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Password: </label>
                        <input
                        className="bg-[#333] text-white border border-gray-600 rounded-lg"
                        />
                        <br/>
                    </div>
                    <div className="flex flex-col">
                        <label>New Bio: </label>
                        <textarea
                            className="bg-[#333] text-white border border-gray-600 rounded-lg"
                        />  
                    </div> 
                </div>
                <div className="flex justify-between w-full pt-6">
                    <button 
                     className="bg-white text-black hover:bg-gray-300 rounded-lg w-[9vw]" 
                     onClick={onClose}>
                     Cancel
                    </button>
                    <button
                     className="bg-white text-black hover:bg-gray-300 rounded-lg w-[9vw]">
                     Save
                    </button>
                </div>
            </div>
        </div>
    )
}