import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_PRJ_ID + ".firebaseapp.com",
  projectId: import.meta.env.VITE_FCM_PRJ_ID,
  storageBucket: import.meta.env.VITE_FCM_PRJ_ID + ".appspot.com",
  messagingSenderId: import.meta.env.VITE_FCM_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MSR_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
