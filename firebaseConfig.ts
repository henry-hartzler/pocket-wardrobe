import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'

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
if (getApps().length === 0) {
	initializeApp(firebaseConfig)
}

const firebaseApp = getApp()
const firebaseAuth = getAuth(firebaseApp)
const firebaseDb = getFirestore(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)

const uploadToFirebaseStorage = async (
	uri: string,
	fileName: string | null | undefined,
	onProgress?: any
) => {
	const fetchResponse = await fetch(uri)
	const theBlob = await fetchResponse.blob()
	const imageRef = ref(firebaseStorage, `outfitImages/${fileName}`)
	const uploadTask = uploadBytesResumable(imageRef, theBlob)

	return new Promise((resolve, reject) => {
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				onProgress && onProgress(progress)
			},
			(error) => {
				//Handle unsuccessful uploads
				reject(error)
			},
			async () => {
				const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
				resolve({
					downloadUrl,
					metadata: uploadTask.snapshot.metadata,
				})
			}
		)
	})
}

export {
	firebaseApp,
	firebaseAuth,
	firebaseDb,
	firebaseStorage,
	uploadToFirebaseStorage,
}
