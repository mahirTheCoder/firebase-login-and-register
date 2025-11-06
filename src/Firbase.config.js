// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXnoFuksRNEyKrKVFhieVHWC6azWo5Z9I",
  authDomain: "note-project-1b9e1.firebaseapp.com",
  projectId: "note-project-1b9e1",
  storageBucket: "note-project-1b9e1.firebasestorage.app",
  messagingSenderId: "780582792403",
  appId: "1:780582792403:web:a1f37e92873b26d06db826",
  measurementId: "G-TJVBJ0LVV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app