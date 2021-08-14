import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBO8gAtYvBqLi4zucDtRWmpIrKRrkOZC1Y",
  authDomain: "messaging-app-cfbb8.firebaseapp.com",
  projectId: "messaging-app-cfbb8",
  storageBucket: "messaging-app-cfbb8.appspot.com",
  messagingSenderId: "680295016385",
  appId: "1:680295016385:web:7a9f890e332961137c7140",
  measurementId: "G-DRNV8BWC0E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
