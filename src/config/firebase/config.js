import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBpu2z_h6JSI-Y82pJQW_BZGQquYqWrTjc",
    authDomain: "joranvest.firebaseapp.com",
    projectId: "joranvest",
    storageBucket: "joranvest.appspot.com",
    messagingSenderId: "863124676903",
    appId: "1:863124676903:web:c270432f1025dfd9810902"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);