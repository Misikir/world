// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXd-bAXN8ufoN34AakPRIxhzaJJo_0dqE",
  authDomain: "world-hello-map.firebaseapp.com",
  projectId: "world-hello-map",
  storageBucket: "world-hello-map.appspot.com",
  messagingSenderId: "129685674664",
  appId: "1:129685674664:web:a9098f0a2c9e6ef51a809d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
