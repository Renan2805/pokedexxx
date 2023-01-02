// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAr5A7b93lsjVliN_e2PrMVVQFyjZYcZo",
  authDomain: "pokedexxx-34254.firebaseapp.com",
  projectId: "pokedexxx-34254",
  storageBucket: "pokedexxx-34254.appspot.com",
  messagingSenderId: "999622801705",
  appId: "1:999622801705:web:66cbb6ec069ef57ac8df38"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }