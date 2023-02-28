// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSQAcHfqFo2CV_RFcyVd4MsElkPNdU53A",
    authDomain: "notesapp-565fa.firebaseapp.com",
    projectId: "notesapp-565fa",
    storageBucket: "notesapp-565fa.appspot.com",
    messagingSenderId: "646734723272",
    appId: "1:646734723272:web:d2cf57272b87a651ad4dfd",
    measurementId: "G-T4HKGN6S2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {firebase}