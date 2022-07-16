//import firebase from "firebase/app";
//import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import 'firebase/compat/firestore';


export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCjXFfwDSKwZsUvt3HwTcm4qllzQJpHFtA",
    authDomain: "uniquechat-35d73.firebaseapp.com",
    projectId: "uniquechat-35d73",
    storageBucket: "uniquechat-35d73.appspot.com",
    messagingSenderId: "847492199806",
    appId: "1:847492199806:web:8f781fdca2eaca360baf2f"
  }).auth();
