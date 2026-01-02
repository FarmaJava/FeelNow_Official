import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiftIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { OpenAI } from "openai";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  // FUNCIÓN PARA OBTENER LA FRASE DIARIA
  const handleDailyQuote = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/quote");
      const data = await res.json();

      if (!res.ok || !data?.[0]?.quote) {
        throw new Error("No se pudo obtener la frase");
      }

      await generateAIResponse(data[0].quote);
    } catch (err) {
      console.log(err);
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No pudimos cargar la frase del día.",
        background: "#3C4B69",
        color: "#fff",
      });
    }

    setLoading(false);
  };


    //Cargar entradas guardadas
    const [entries, setEntries] = useState({});
  
    const generateAIResponse = async (text) => {
      Swal.fire({
        title: "Generando...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        Swal.fire({
          title: "Tu frase del día:",
          text: data.result,
          background: "#3C4B69",
          color: "#fff",
          icon: "info",
        });
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };


  return (
    <div className="flex min-h-screen bg-[#f2f7ff]">

      {/* Botón menu */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          fixed top-4 z-50 p-3 rounded-r-xl shadow-lg
          bg-[#3C4B69dd] backdrop-blur-lg hover:scale-105
          text-white text-3xl transition-all duration-300 ease-in-out
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
          border-r border-white/10 transition-transform duration-300 z-40
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

        <hr className="w-[80%] border-white/20 mt-6" />

        <p className="mt-4 mb-2 text-xs uppercase tracking-wider text-white/60">
          Utilidades
        </p>

        {/* Navegación */}
        <nav className="w-full flex flex-col gap-3 mt-2 px-6">

          <Link
            to="/personal-diary/diary"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Diario
          </Link>

          {/* Botón del regalo del día */}
          <button
            onClick={handleDailyQuote}
            className={`flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 transition rounded-lg mb-3
                    ${loading 
                    ? "bg-gray-400 opacity-70 cursor-not-allowed" 
                    : ""
                  }`}
            
          >
            <GiftIcon className="w-6 h-6 text-[#8DD3FF]" />
            <span>{loading ? "Cargando Regalo..." : "Regalo del Dia!"}</span>
          </button>

        </nav>

      </aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}