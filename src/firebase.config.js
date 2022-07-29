import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZozF8GuH2HcgYbtTp4TKt9lv-ygR2xBE",
    authDomain: "house-marketplace-df9f9.firebaseapp.com",
    projectId: "house-marketplace-df9f9",
    storageBucket: "house-marketplace-df9f9.appspot.com",
    messagingSenderId: "111039438900",
    appId: "1:111039438900:web:199d20da930e0378ac6a61"
  };
  
  // Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()