import { useState, useEffect } from 'react';
import Header from '../components/Header';

const mockPosts = [
  {
    id: 1,
    username: 'daEggert',
    frontImageUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_80,w_1200/v1/crm/oakland/Raising-Canes_FDF90360-0B7E-A529-857B9EAFB5B05822-fdf8f85cad40d44_fdf96172-0f22-2309-e2585beab2f9bc1c.png',
    backImageUrl: 'https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg',
    caption: 'Enjoying chicken fingers! 🎉',
  },
  {
    id: 2,
    username: 'ProfessorE',
    frontImageUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_80,w_1200/v1/crm/oakland/Raising-Canes_FDF90360-0B7E-A529-857B9EAFB5B05822-fdf8f85cad40d44_fdf96172-0f22-2309-e2585beab2f9bc1c.png',
    backImageUrl: 'https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg',
    caption: 'A beautiful evening!',
  },
];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

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
          {posts.length > 0 && (
            <>
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <span className="ml-2 font-semibold">{posts[currentIndex].username}</span>
              </div>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={posts[currentIndex].frontImageUrl}
                  alt="Front Post"
                  className="w-full h-full object-cover rounded-3xl object-center"
                />
                <img
                  src={posts[currentIndex].backImageUrl}
                  alt="Back Post"
                  className="absolute top-2 left-2 w-20 h-20 border-2 border-black rounded-3xl shadow-lg object-cover object-center"
                />
              </div>
              <p className="mt-2 text-center">{posts[currentIndex].caption}</p>
            </>
          )}
        </div>
        <button onClick={nextPost} className="p-4 text-5xl">➡️</button>
      </div>
    </div>
  );
}
