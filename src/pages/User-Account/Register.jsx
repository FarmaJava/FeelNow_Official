import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx"; // IMPORTANTE

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth(); // 👈 usando la función del AuthContext

  const handleRegister = async () => {
    if (!fullName || !email || !password || !repeatPassword) {
      return setError("Completa todos los campos.");
    }

    if (password !== repeatPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    setLoading(true);

    try {
      // Registro mediante AUTH CONTEXT
      await register(email, password, fullName);

      Swal.fire({
        title: "¡Bienvenido a FeelNow! 😊",
        text: "Te enviamos un correo de verificación. Revísalo antes de iniciar sesión.",
        icon: "success",
      });

      navigate("/user/login"); // Redirige al login

    } catch (err) {
      console.error(err);
      setError(` Ocurrio un error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/fondologin.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#5ea7c855] backdrop-blur-sm"></div>

      <div className="absolute top-4 left-6">
        <a
          href="/home"
          className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        >
          <span className="text-white text-5xl hover:-translate-x-1 transition">
            ←
          </span>
        </a>
      </div>

      <div className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/20 bg-white/10 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrarse</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
          />

          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
          />

          <input
            type="password"
            placeholder="Repetir contraseña"
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md outline-none placeholder-white/70"
          />

          {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
            style={{ backgroundColor: "#3C79A6", color: "#F7FBFF" }}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </div>

        <p className="text-xs text-white/80 mt-4 text-center">
          Al registrarte aceptas los Términos y Condiciones. © FeelNow 2025
        </p>

        <p className="mt-6 text-left text-sm text-white/90">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/user/login" className="underline hover:text-[#8DD3FF]">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
