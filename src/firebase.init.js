// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCa-n8ztmzXVfviWTDfYjwN9lAWjnSMxJo",
    authDomain: "investment-32002.firebaseapp.com",
    projectId: "investment-32002",
    storageBucket: "investment-32002.appspot.com",
    messagingSenderId: "242539252782",
    appId: "1:242539252782:web:6cb22ec017177c4c7263bf",
    measurementId: "G-P9VCD3EKKM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;