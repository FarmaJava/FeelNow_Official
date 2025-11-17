import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !username || !password || !repeatPassword) {
      return setError("Completa todos los campos.");
    }

    if (password !== repeatPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);


      console.log("Usuario creado:", userCredential.user);

      alert("Cuenta creada con éxito. ¡Bienvenido!");

      // ACA si querés luego guardamos en Firestore (nombre, username, etc)

    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/fondologin.jpg')" }}
    >
      {/* Filtro frío */}
      <div className="absolute inset-0 bg-[#5ea7c855] backdrop-blur-sm"></div>

      {/* Flecha */}
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
            type="text"
            placeholder="Nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
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

          {/* Error */}
          {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )}

          {/* Botón */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
