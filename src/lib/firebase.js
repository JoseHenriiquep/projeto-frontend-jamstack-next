import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxO2LFWXc3Q503zWRjA5hJwGhbfUbGa8o",
  authDomain: "front-end-next.firebaseapp.com",
  projectId: "front-end-next",
  storageBucket: "front-end-next.firebasestorage.app",
  messagingSenderId: "61968579020",
  appId: "1:61968579020:web:e7226c21b626cff9834569",
  measurementId: "G-5HDZ1MDGF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);