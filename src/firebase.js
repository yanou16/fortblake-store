// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmUeqCCZR5UtB8iBFlwJlIie3EGchpAek",
  authDomain: "casual-53820.firebaseapp.com",
  projectId: "casual-53820",
  storageBucket: "casual-53820.firebasestorage.app",
  messagingSenderId: "255093247357",
  appId: "1:255093247357:web:105e4b8d05235e12e75014",
  measurementId: "G-3P7GZJL2GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };