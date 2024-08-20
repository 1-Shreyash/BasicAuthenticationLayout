// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`,
  // apiKey: "AIzaSyC2Odj7QSWNg2pGo2rybh5yh1OUcwmPPKg",
  // authDomain: "projectreport-9ef09.firebaseapp.com",
  // projectId: "projectreport-9ef09",
  // storageBucket:"projectreport-9ef09.appspot.com",
  // messagingSenderId: "470570171934",
  // appId: "1:470570171934:web:755302013f3f6e67b9b80f",
  // measurementId: "G-SCKPB3KMWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;