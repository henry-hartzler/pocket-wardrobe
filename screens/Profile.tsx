import { StyleSheet } from 'react-native'
import React from 'react'
import { firebaseAuth } from '../firebaseConfig'
import { RouterProps } from '../types'
import { Layout, Button, Text } from '@ui-kitten/components'

const Profile = ({ navigation }: RouterProps) => {
	return (
		<Layout style={styles.container}>
			<Text>Profile</Text>
			<Button onPress={() => firebaseAuth.signOut()}>Logout</Button>
		</Layout>
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
