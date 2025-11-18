import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const { user, logout } = useAuth();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="w-full flex justify-between items-center px-6 md:px-8 py-4 shadow-lg backdrop-blur-xl fixed top-0 left-0 z-50"
        style={{ backgroundColor: "#8DD3FF55" }}
      >
        {/* Logo */}
        <div
          className="text-2xl md:text-3xl font-extrabold tracking-wide cursor-pointer drop-shadow"
          style={{ color: "#ffffffff" }}
          onClick={() => scrollToSection("home")}
        >
          FeelNow
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="font-semibold hover:underline transition"
            style={{ color: "#ffffffff" }}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("que-es")}
            className="font-semibold hover:underline transition"
            style={{ color: "#ffffffff" }}
          >
            ¿Qué es FeelNow?
          </button>

          <button
            onClick={() => scrollToSection("quienes-somos")}
            className="font-semibold hover:underline transition"
            style={{ color: "#ffffffff" }}
          >
            ¿Quiénes somos?
          </button>
        </div>

        {/* --- Si NO está logueado (desktop) --- */}
        {!user ? (
          <a
            href="/user/login"
            className="hidden md:block px-4 py-2 rounded-xl font-semibold shadow-lg transition hover:scale-105"
            style={{
              backgroundColor: "#6bc4c0ff",
              color: "#F7FBFF",
            }}
          >
            Iniciar sesión
          </a>
            ) : ( 
          <div className="hidden md:block relative"> {/* --- Si está logueado (desktop) --- */}
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              {/* Icono de usuario (SVG) */}
              <svg
                className="w-8 h-8 text-white drop-shadow"
                fill="none"
                stroke="currentColor" 
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z"
                />
              </svg>
            </button>

            {/* Menú desplegable */}
            {openUserMenu && (
              <div className="absolute right-0 mt-3 w-80 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl p-4 text-black">
                <p className="font-semibold text-sm break-all mb-3">
                  {user.email}
                </p>
                <button
                  onClick={logout}
                  className="w-30px text-center font-semibold px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburguesa móvil */}
        <button
          className="md:hidden text-3xl"
          style={{ color: "#ffffffff" }}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* Menu móvil */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full backdrop-blur-xl shadow-xl flex flex-col items-center py-6 gap-6 z-40">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg font-semibold"
            style={{ color: "#ffffffff" }}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("que-es")}
            className="text-lg font-semibold"
            style={{ color: "#ffffffff" }}
          >
            ¿Qué es FeelNow?
          </button>

          <button
            onClick={() => scrollToSection("quienes-somos")}
            className="text-lg font-semibold"
            style={{ color: "#ffffffff" }}
          >
            ¿Quiénes somos?
          </button>

          {/* Móvil: si no está logueado */}
          {!user ? (
            <a
              href="/user/login"
              className="px-4 py-2 rounded-xl font-semibold shadow-lg"
              style={{
                backgroundColor: "#6bc4c0ff",
                color: "#F7FBFF",
              }}
            >
              Iniciar sesión
            </a>
          ) :  (
            <div className="flex flex-col items-center gap-3"> {/* Móvil: si está logueado */}
              <p className="text-white/90 text-center">{user.email}</p>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-xl font-semibold bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}

      <Outlet />
    </>
  );
}
