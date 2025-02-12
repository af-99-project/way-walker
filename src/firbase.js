import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 🔹 getFirestore 사용

// 브라우저 환경에서만 Analytics 실행
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc };
