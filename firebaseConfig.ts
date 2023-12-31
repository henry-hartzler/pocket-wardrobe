import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBGWnLgeQLoIHenPJLLr2J491Y2j-zUD5g',
	authDomain: 'business-wardrobe-a821e.firebaseapp.com',
	projectId: 'business-wardrobe-a821e',
	storageBucket: 'business-wardrobe-a821e.appspot.com',
	messagingSenderId: '893436857597',
	appId: '1:893436857597:web:ce6ae0f92c66dbe4ab4294',
	measurementId: 'G-K57XCC7V6Z',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getFirestore(firebaseApp)
