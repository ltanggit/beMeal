import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
