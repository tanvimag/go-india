// src/firebase.js - FINAL VERSION
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACBUnwlFU4G-7BZokxEwgTZrshDpf9WlU",
  authDomain: "mygoindia123-6d7e9.firebaseapp.com",
  projectId: "mygoindia123-6d7e9",
  storageBucket: "mygoindia123-6d7e9.firebasestorage.app",
  messagingSenderId: "138747371074",
  appId: "1:138747371074:web:793c71e40f325a6e83d7db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth exports
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Storage exports
const storage = getStorage(app);

// Firestore exports
const db = getFirestore(app);

// Export everything
export { 
  auth, 
  googleProvider, 
  storage, 
  db, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
};
export default app;