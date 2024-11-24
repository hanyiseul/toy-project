// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb-2X_679m3LwLim41UtdDjum9eMbvaWs",
  authDomain: "carrot-app-2722a.firebaseapp.com",
  projectId: "carrot-app-2722a",
  storageBucket: "carrot-app-2722a.appspot.com",
  messagingSenderId: "403800303805",
  appId: "1:403800303805:web:838b745a2043aa5eb96fd4",
  measurementId: "G-E7EBY2NTQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);