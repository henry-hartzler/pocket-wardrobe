import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	View,
	FlatList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Image, Text } from '@rneui/themed'
import { firebaseAuth, firebaseDb } from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Outfit } from '../types'
import { Tile } from '@rneui/base'
import { uuidv4 } from '@firebase/util'

function sortFunc(a: string, b: string) {
	return a > b ? 1 : a > b ? -1 : 0
}
function sortByDateUploaded(arr: Outfit[]): Outfit[] {
	return arr.sort((a, b) => {
		const dateA = a.dateUploaded || ''
		const dateB = b.dateUploaded || ''
		return dateB.localeCompare(dateA)
	})
}

const Profile = () => {
	const [allOutfits, setAllOutfits] = useState<Outfit[]>([])
	const currentUserId = firebaseAuth.currentUser?.uid

	const q = query(
		collection(firebaseDb, 'outfits'),
		where('userId', '==', `${currentUserId}`)
	)

	const getAllOutfits = async () => {
		const querySnapshot = await getDocs(q)
		const outfits: Outfit[] = []

		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, ' => ', doc.data())
			outfits.push(doc.data() as Outfit)
		})
		setAllOutfits(sortByDateUploaded(outfits))
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

	function renderItem({ item }) {
		return (
			<Tile
				imageProps={{ resizeMode: 'contain' }}
				imageSrc={{ uri: item.img }}
			/>
		)
	}

	return (
		<View style={styles.container}>
			{allOutfits.length > 0 ? (
				<FlatList
					data={allOutfits}
					renderItem={renderItem}
					keyExtractor={(item) => item.userId + uuidv4()}
				/>
			) : (
				<>
					<ActivityIndicator />
					<Button
						title='Sync Outfits'
						onPress={() => getAllOutfits()}
					/>
				</>
			)}
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
