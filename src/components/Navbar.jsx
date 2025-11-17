import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        {/* Login desktop */}
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
        </div>
      )}

      <Outlet />
    </>
  );
}
