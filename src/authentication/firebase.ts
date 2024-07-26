import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "movie-rating-app-react.firebaseapp.com",
  projectId: "movie-rating-app-react",
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: "82423225950",
  appId: "1:82423225950:web:f19c4f59a700fae6055ecf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fireStore = getFirestore();
