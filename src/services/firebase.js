import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCjVAwQe2nzt5E9W1C6SiAPfuUxEL7tBao",
    authDomain: "app-celulares-crud.firebaseapp.com",
    projectId: "app-celulares-crud",
    storageBucket: "app-celulares-crud.appspot.com",
    messagingSenderId: "997976729963",
    appId: "1:997976729963:web:3a7d3c5a48879b4d2b442e"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

  // conexão na base de dados de firebase
export const db = fb.firestore();