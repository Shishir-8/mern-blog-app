// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mean-blog-c0b7b.firebaseapp.com",
  projectId: "mean-blog-c0b7b",
  storageBucket: "mean-blog-c0b7b.firebasestorage.app",
  messagingSenderId: "822467144535",
  appId: "1:822467144535:web:8a8460d778cde5dd732c12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})

