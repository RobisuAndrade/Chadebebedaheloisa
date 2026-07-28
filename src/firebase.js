import { initializeApp } from "firebase/app";
// IMPORTANTE: Agora importamos o Realtime Database
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAT8SILYBA5M4tCP4jDnD6c5UqVt_IiH7Q",
  authDomain: "chadebb.firebaseapp.com",
  databaseURL: "https://chadebb-default-rtdb.firebaseio.com",
  projectId: "chadebb",
  storageBucket: "chadebb.firebasestorage.app",
  messagingSenderId: "1040845987466",
  appId: "1:1040845987466:web:01c1f31bdf2ad62ecc5773",
  measurementId: "G-NHH1ZLSK5F"
};

const app = initializeApp(firebaseConfig);

// Inicializa e exporta o Realtime Database
export const db = getDatabase(app);