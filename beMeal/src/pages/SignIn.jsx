import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Sign In to BeMeal</h1>
      <form
        onSubmit={handleSignIn}
        className="bg-[#1a1a1a] p-8 rounded-2xl shadow-md w-96 text-center"
      >
        <div className="mb-4">
          <label className="block text-gray-400 text-left">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#333] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-left">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#333] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-lg text-lg font-bold hover:bg-gray-200 transition"
        >
          Sign In
        </button>
      </form>
      <p className="mt-6 text-gray-500 text-sm">The back can never be too big. Be Meal.</p>
    </div>
  );
}
