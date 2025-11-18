import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f2f7ff]">

    {/* Botón hamburguesa que se desplaza con el menú */}
    <button
      onClick={() => setOpen(!open)}
      className={`
        fixed top-4 z-50 p-3 rounded-r-xl shadow-lg
        bg-[#3C4B69dd] backdrop-blur-lg hover:scale-105
        text-white text-3xl
        transition-all duration-300 ease-in-out
        ${open ? "left-64" : "left-0"}
      `}
    >
      ☰
    </button>


      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-[#27354Aee] backdrop-blur-xl shadow-xl 
          border-r border-white/10
          transition-transform duration-300 z-40
          flex flex-col items-center text-white pt-20
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Icono de usuario */}
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
          <div className="w-10 h-10 rounded-full border-2 border-white"></div>
        </div>

        {/* Email */}
        <p className="mt-4 text-sm font-semibold text-white/80">
          {user?.email}
        </p>

        {/* Divider */}
        <hr className="w-[80%] border-white/20 mt-6" />

        {/* Título sección */}
        <p className="mt-4 mb-2 text-xs uppercase tracking-wider text-white/60">
          Utilidades
        </p>

        {/* Links */}
        <nav className="w-full flex flex-col gap-3 mt-2 px-6">

          <Link
            to="/personal-diary/actividad1"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Actividad 1
          </Link>

          <Link
            to="/personal-diary/actividad2"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Actividad 2
          </Link>

          <Link
            to="/personal-diary/actividad3"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Actividad 3
          </Link>

          <Link
            to="/personal-diary/actividad4"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Actividad 4
          </Link>

        </nav>

      </aside>

      {/* Contenido */}
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  );
}
