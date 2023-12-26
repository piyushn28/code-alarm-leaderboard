import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB2x3TdcPFFKsha9WFSeJIAAovYA0Mm0ic",
  authDomain: "coding-f80d1.firebaseapp.com",
  databaseURL: "https://coding-f80d1.firebaseio.com",
  projectId: "coding-f80d1",
  storageBucket: "coding-f80d1.appspot.com",
  messagingSenderId: "948322135506",
  appId: "1:948322135506:web:a97f5c8b36092552a7ec0b",
  measurementId: "G-FPHFPPVXZZ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
