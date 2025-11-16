import { Link, Outlet } from "react-router-dom";

export default function NavbarDiary() {
  return ( <>
        <nav
        className="flex items-center justify-between px-8 py-4 shadow-md"
        style={{ backgroundColor: "#FFE8D6" }} // tono cálido y suave   
        >

            {/* Botón login */}
            <button
            className="px-4 py-2 rounded-xl font-semibold shadow-lg transition hover:scale-105"
            style={{
                backgroundColor: "#FFB997", // acento suave
                color: "#4A2C2A",           // texto cálido
            }}
            >
            Iniciar sesión
            </button>
        </nav>
    <Outlet />
  </>
  );
}
