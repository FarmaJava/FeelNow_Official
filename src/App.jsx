import { Routes, Route } from "react-router-dom";
import Home from "./pages/Start/Home.jsx";
import Diary from "./pages/User-Diary/Diary.jsx";
import Stats from "./pages/User-Diary/Stats.jsx";
import Profile from "./pages/User-Diary/Profile.jsx";
import Music from "./pages/User-Diary/Music.jsx";
import Navbar from "./components/Navbar.jsx";
import SideMenu from "./components/SideMenu.jsx";
import Login from "./pages/User-Account/Login.jsx";
import Register from "./pages/User-Account/Register.jsx";
import UserDisplay from "./pages/User-Account/User-display.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
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

          <Route path="/personal-diary" element={<SideMenu />}>
            <Route index element={<Diary />} />
            <Route path="diary" element={<Diary />} />
            <Route path="stats" element={<Stats />} />
            <Route path="profile" element={<Profile />} />
            <Route path="music" element={<Music />} />
          </Route>
        </Routes>

      </div>

    </AuthProvider>
  );
}

export default App;
