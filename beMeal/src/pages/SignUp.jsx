import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Add your sign-up logic here
    navigate("/feed");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Sign Up for BeMeal</h1>
      <form
        onSubmit={handleSignUp}
        className="bg-[#1a1a1a] p-8 rounded-2xl shadow-md w-96 text-center"
      >
        <div className="mb-4">
          <label className="block text-gray-400 text-left mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#333]
                       text-white border border-gray-600
                       rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-left mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#333]
                       text-white border border-gray-600
                       rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-left mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#333]
                       text-white border border-gray-600
                       rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2
                     rounded-lg text-lg font-bold
                     hover:bg-gray-200 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-gray-500 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/signin")}
          className="text-blue-400 underline hover:text-blue-300"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
