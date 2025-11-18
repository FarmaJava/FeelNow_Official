// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase/firebase.js";

// Crear contexto
const AuthContext = createContext();

// Hook para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    // Usuario actual
  const [loading, setLoading] = useState(true); // Carga inicial

  useEffect(() => {
    // Escucha los cambios de autenticación (login, logout, reload, etc.)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Cargando");
        
        setUser(currentUser); // user puede ser NULL o un usuario logueado
        setLoading(false);    // Cuando Firebase responde, dejamos de cargar
    });

    return unsubscribe; // ejecuta la funcion y lo hace una vez
  }, []);

  //  Registrar usuario
  const register = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // enviar verificación
    await sendEmailVerification(user);
  };


  //  Iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Cerrar sesión
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {/* Evita que la app cargue antes de saber si el usuario ya estaba logueado */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
