import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBgkdNNvqYruUeaxKkKoLLxuY3o7wB8VPk",
  authDomain: "inmobiliaria-c4fa3.firebaseapp.com",
  projectId: "inmobiliaria-c4fa3",
  storageBucket: "inmobiliaria-c4fa3.firebasestorage.app",
  messagingSenderId: "240049942922",
  appId: "1:240049942922:web:653e8f6c547d74b9c55873",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
