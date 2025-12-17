import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfFBrVDEMxxjE3YB82WR_oIm5n-FIrrOs",
  authDomain: "job-tracker-f39a4.firebaseapp.com",
  projectId: "job-tracker-f39a4",
  storageBucket: "job-tracker-f39a4.firebasestorage.app",
  messagingSenderId: "165146236438",
  appId: "1:165146236438:web:1fe944671e71fd467c8737",
  measurementId: "G-J41PYMDE6E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
