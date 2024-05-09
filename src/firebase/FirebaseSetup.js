import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import.meta.env
// When hosting on netlify change this to a netlify environment variable

const firebaseConfig = {
  apiKey: "AIzaSyArrxmrN5OE8YQvMBklcIDTz_YLBP-TV0E",
  authDomain: "bizhub-b50c.firebaseapp.com",
  projectId: "bizhub-b50c",
  storageBucket: "bizhub-b50c.appspot.com",
  messagingSenderId: "918254140764",
  appId: "1:918254140764:web:4a46a5722fc9884772d599",
  measurementId: "G-XDJED6V9JG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);