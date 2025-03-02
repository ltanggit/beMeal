import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-black text-white">
      <div className="flex items-center justify-center relative p-6 pb-10">
        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          BeMeal
        </h1>
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
