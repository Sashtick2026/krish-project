
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXr_pvsPF9DaQVGVYKuUaDy20LBJR6zzQ",
  authDomain: "sraya-valentins.firebaseapp.com",
  projectId: "sraya-valentins",
  storageBucket: "sraya-valentins.firebasestorage.app",
  messagingSenderId: "625963049162",
  appId: "1:625963049162:web:510254f973a366b1dc9433",
  measurementId: "G-Q82WX5JDHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
