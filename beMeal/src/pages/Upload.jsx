import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import UploadImage from '../assets/upload.png'

export default function Upload() {
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
}
  return (
    <div className="bg-black min-h-screen w-screen text-white p-4 relative flex flex-col">
      <Header/>
      <div className="flex flex-grow justify-center items-center">
        <div className='text-gray-400 bg-[#1a1a1a] p-3 rounded-2xl shadow-md w-[50%] h-[70vh]'>
          <div className="flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-400 p-5 w-[100%] h-[100%]">
            <img src={UploadImage} className="w-[4vw]"/>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
            <button
            onClick={() => document.getElementById('fileInput').click()}
            className="mt-8 bg-white text-black hover:bg-gray-200 rounded-lg w-[10vw]"
            >Choose Image</button>
            {selectedFile && <p className="mt-6 text-gray-400 text-sm">Selected file: {selectedFile.name}</p>}
            <p className="mt-2 text-gray-500 text-sm">Click to post your lastest meal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
