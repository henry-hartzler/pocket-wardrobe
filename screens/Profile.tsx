import { StyleSheet, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Text } from '@rneui/themed'

const Profile = () => {
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
	},
})

export default Profile
