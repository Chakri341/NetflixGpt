// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-61cd7.firebaseapp.com",
  projectId: "netflixgpt-61cd7",
  storageBucket: "netflixgpt-61cd7.appspot.com",
  messagingSenderId: "651619190899",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
