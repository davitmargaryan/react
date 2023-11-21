// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2j8YRgQDMPzTy9TUimybDTdJQA2K6Vao",
  authDomain: "learntech-22229.firebaseapp.com",
  projectId: "learntech-22229",
  storageBucket: "learntech-22229.appspot.com",
  messagingSenderId: "713229734426",
  appId: "1:713229734426:web:86199a6588a708610637a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
