import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvOEjIr-n3_EqiWlIge7FukiJ8komGbYE",
  authDomain: "eternal-quill-01.firebaseapp.com",
  projectId: "eternal-quill-01",
  storageBucket: "eternal-quill-01.appspot.com",
  messagingSenderId: "709677299644",
  appId: "1:709677299644:web:76a6f4f613527bff44ddb9",
  measurementId: "G-NB0TCWYNPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
