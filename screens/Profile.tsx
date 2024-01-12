import { StyleSheet } from 'react-native'
import React from 'react'
import { Layout, Text } from '@ui-kitten/components'

const Profile = () => {
	return (
		<Layout style={styles.container}>
			<Text>Profile</Text>
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
