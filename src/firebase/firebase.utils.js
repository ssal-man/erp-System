import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyChrS5ozV7d66pr250Of9-y5T8cWzpzGYo",
    authDomain: "erpsystempro-586da.firebaseapp.com",
    databaseURL: "https://erpsystempro-586da.firebaseio.com",
    projectId: "erpsystempro-586da",
    storageBucket: "erpsystempro-586da.appspot.com",
    messagingSenderId: "553280373601",
    appId: "1:553280373601:web:647ea72003d8615b5d7b20",
    measurementId: "G-K6K5MYSL6G"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
