import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      login(data.token);
      navigate("/feed");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black text-white px-8 py-8">
      <div className="flex flex-col w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">RETURNING USER</h2>
          <h2 className="text-3xl font-bold">NEW USER</h2>
        </div>

        <div className="flex flex-row w-full space-x-16">
          <div className="flex-1 flex flex-col justify-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSignIn} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-400 mb-1" htmlFor="username">
                  Username *
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-[#333] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
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
                  className="w-full px-3 py-2 bg-[#333] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
              >
                LOG IN
              </button>
            </form>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <ul className="list-disc list-inside mb-6 space-y-1 text-gray-300">
              <li>Post Your Meals</li>
              <li>Connect with Others</li>
              <li>See Meals Around the World</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
