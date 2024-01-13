import { StyleSheet, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Text } from '@rneui/themed'
import { collection, query, where } from "firebase/firestore";
import { currentUserId, firebaseDb } from '../firebaseConfig';

const Profile = () => {
	
const citiesRef = collection(firebaseDb, `outfits${currentUserId}`);
	return (
		<View style={styles.container}>
			<Text>Profile</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
})

export default Profile
