import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyDUd2eLwFhVhdXBeMIpgzIo6c8uuwCPRNc",
  authDomain: "contestplatformschool.firebaseapp.com",
  databaseURL: "https://contestplatformschool.firebaseio.com",
  projectId: "contestplatformschool",
  storageBucket: "contestplatformschool.appspot.com",
  messagingSenderId: "940614591428",
  appId: "1:940614591428:web:dc03d9fb283844965e7a91",
  measurementId: "G-RYL725SHXY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase;