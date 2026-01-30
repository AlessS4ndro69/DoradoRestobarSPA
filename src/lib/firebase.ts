import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // <--- Importa esto
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBG4Ni6VYmWdY1FqNAtDkDy7DI-qQzLQIQ",
  authDomain: "doradorestobar-dc743.firebaseapp.com",
  projectId: "doradorestobar-dc743",
  storageBucket: "doradorestobar-dc743.firebasestorage.app",
  messagingSenderId: "608699097782",
  appId: "1:608699097782:web:f0baa668c05e537d9cbc17",
  measurementId: "G-YB4YTMFND0"
};

const app = initializeApp(firebaseConfig);

// 2. Inicializar y EXPORTAR los servicios que usarás
export const db = getFirestore(app); // Base de datos
export const auth = getAuth(app);    // Login
export const analytics = getAnalytics(app);
export default app;