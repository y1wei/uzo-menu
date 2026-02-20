import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Paste your config from Firebase Console here
const firebaseConfig = {
  apiKey: "AIzaSyDn1Mc0vfxH3CZ6hKfEa5UsZpB6CFJGnX4",
  authDomain: "uzo-menu.firebaseapp.com",
  projectId: "uzo-menu",
  storageBucket: "uzo-menu.firebasestorage.app",
  messagingSenderId: "717673685617",
  appId: "1:717673685617:web:f06683d78cc846b57671d0"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)