import { Routes, Route } from "react-router-dom";
import Home from "./pages/init/Home.jsx";
import Diary from "./pages/Diary.jsx";
import Stats from "./pages/Stats.jsx";
import Profile from "./pages/Profile.jsx";
import Music from "./pages/Music.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarDiary from "./components/NavbarDiary.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="main" element={<NavbarDiary />}></Route>
      </Routes>

    </div>
  );
}

export default App;
