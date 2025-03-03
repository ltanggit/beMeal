import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: Sign-in logic here
    navigate("/feed");
  };

  return (
    // Outer container fills the screen and centers the content
    <div className="flex items-center justify-center w-screen h-screen bg-black text-white px-8 py-8">
      {/* Inner container arranges everything in a row */}
      <div className="flex flex-col w-full max-w-5xl">
        {/* Headings and buttons in the same row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">RETURNING USER</h2>
          <h2 className="text-3xl font-bold">NEW USER</h2>
        </div>

        <div className="flex flex-row w-full space-x-16">
          {/* LEFT COLUMN: Returning User */}
          <div className="flex-1 flex flex-col justify-center">
            <form onSubmit={handleSignIn} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-400 mb-1" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#333] text-white
                             border border-gray-600 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-1" htmlFor="password">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#333] text-white
                             border border-gray-600 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2
                           rounded-lg text-lg font-bold
                           hover:bg-gray-200 transition"
              >
                LOG IN
              </button>
            </form>
            <a
              href="#"
              className="text-blue-400 mt-3 inline-block underline hover:text-blue-300"
            >
              Reset your password
            </a>
          </div>

          {/* RIGHT COLUMN: New User */}
          <div className="flex-1 flex flex-col justify-center">
            <ul className="list-disc list-inside mb-6 space-y-1 text-gray-300">
              <li>Post Your Meals</li>
              <li>Connect with Others</li>
              <li>See Meals Around the World</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-black font-bold py-2 px-4
                         rounded hover:bg-gray-200 transition"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
