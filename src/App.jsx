import { Routes, Route } from "react-router-dom";
import Home from "./pages/Start/Home.jsx";
import Diary from "./pages/User-Diary/Diary.jsx";
import Stats from "./pages/User-Diary/Stats.jsx";
import Profile from "./pages/User-Diary/Profile.jsx";
import Music from "./pages/User-Diary/Music.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarDiary from "./components/NavbarDiary.jsx";
import Login from "./pages/User-Account/login.jsx";
import Register from "./pages/User-Account/Register.jsx";
import UserDisplay from "./pages/User-Account/User-display.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>

        <Route path="/user" element={<UserDisplay />}> 
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>

        <Route path="/personal-diary" element={<NavbarDiary />} />
      </Routes>
    </div>
  );
}

export default App;
