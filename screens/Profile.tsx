import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { firebaseAuth } from '../firebaseConfig'
import { Button } from '@rneui/themed'
import { RouterProps } from '../types'


const Profile = ({ navigation }: RouterProps) => {
	return (
		<View style={styles.container}>
			<Text>Profile</Text>
			<Button
				onPress={() => firebaseAuth.signOut()}
				title='Logout'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Profile
