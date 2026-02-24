// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-7a640.firebaseapp.com",
  projectId: "blog-app-7a640",
  storageBucket: "blog-app-7a640.firebasestorage.app",
  messagingSenderId: "486295795074",
  appId: "1:486295795074:web:1732d46148fa7f99b10b9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);