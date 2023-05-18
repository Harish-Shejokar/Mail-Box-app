import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBy_HksGn6pJWbmTDB-472-Avh3uuQ1pkg",
  authDomain: "mail-box-email-store.firebaseapp.com",
  projectId: "mail-box-email-store",
  storageBucket: "mail-box-email-store.appspot.com",
  messagingSenderId: "396622683566",
  appId: "1:396622683566:web:0e306a0608368efd3e3c3f",
};

const firebaseapp = firebase.intializeApp(firebaseConfig);

const dataBase = firebaseapp.firestore();

export {dataBase} 