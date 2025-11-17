// Importar lo necesario
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Pegá acá tu configuración EXACTA de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVaJrkLmX7lE6X0oryceO9TFv6dh_3ljc",
  authDomain: "feelnow-oficial-database.firebaseapp.com",
  projectId: "feelnow-oficial-database",
  storageBucket: "feelnow-oficial-database.firebasestorage.app",
  messagingSenderId: "1024671734578",
  appId: "1:1024671734578:web:2a0812ec72f217f7db152b"
};

// Inicializar app
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
