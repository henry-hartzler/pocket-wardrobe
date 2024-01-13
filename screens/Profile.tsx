import { Alert, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Text } from '@rneui/themed'
import { firebaseAuth, firebaseDb } from '../firebaseConfig'
import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
	doc,
	getDocs,
} from 'firebase/firestore'
import { Outfit } from '../types'

const Profile = () => {
	const [allOutfits, setAllOutfits] = useState<Outfit[]>([])
	const currentUserId = firebaseAuth.currentUser?.uid

	const q = query(
		collection(firebaseDb, `outfits${currentUserId}`),
		orderBy('dateUploaded', 'desc')
	)

	const getAllOutfits = async () => {
		const querySnapshot = await getDocs(q)
		const outfits: Outfit[] = []
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, ' => ', doc.data())
			outfits.push(doc.data() as Outfit)
		})
		setAllOutfits(outfits)
	}

	useEffect(() => {
		console.log(`start: ${allOutfits.length}`)
		try {
			getAllOutfits()
		} catch {
			Alert.alert('There was an error retrieving outfit data.')
		} finally {
			console.log(`end: ${allOutfits.length}`)
		}
	}, [])


	return (
		<View style={styles.container}>
			<Text>{allOutfits.length > 0 ? allOutfits.length : 'No data yet'}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
})

export default Profile
