import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"; // IMPORTANTE

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      await login(email, password);
      window.location.href = "/personal-diary";
    } catch (err) {
      setError("Credenciales inválidas o usuario no encontrado.");
      console.log(err.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/fondologin.jpg')" }}
      >
        {/* Filtro frío */}
        <div className="absolute inset-0 bg-[#5ea7c855] backdrop-blur-sm"></div>

        {/* Botón volver */}
        <div className="absolute top-4 left-6">
          <a
            href="/home"
            className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
          >
            <span className="text-white text-5xl transform transition-transform duration-300 hover:-translate-x-1">
              ←
            </span>
          </a>
        </div>

        {/* Container */}
        <div className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/20 bg-white/10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error */}
            {error && (
              <p className="text-red-300 text-sm text-center -mt-2">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
              style={{ backgroundColor: "#3C79A6", color: "#F7FBFF" }}
            >
              Iniciar sesión
            </button>
          </div>

          <p className="text-xs text-white/80 mt-4 text-center">
            Al iniciar sesión aceptas los Términos y Condiciones. © FeelNow 2025
          </p>

          <p className="mt-6 text-left text-sm text-white/90">
            ¿No tienes una cuenta?{" "}
            <Link to="/user/register" className="underline hover:text-[#8DD3FF]">
              Créala ahora
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
