// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXV01EGjClEV5cIHlL0b3lz6_hLE3Bk24",
  authDomain: "chat-app-demo-17b82.firebaseapp.com",
  projectId: "chat-app-demo-17b82",
  storageBucket: "chat-app-demo-17b82.appspot.com",
  messagingSenderId: "1075485491570",
  appId: "1:1075485491570:web:b4495f8239964a9bed9deb",
  measurementId: "G-JZFWM9MY6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const db = getFirestore(app);