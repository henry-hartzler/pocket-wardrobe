import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { firebaseAuth } from '../../firebaseConfig'
import { Button } from '@rneui/themed'

interface RouterProps {
	navigation: NavigationProp<any, any>
}
const RandomOutfit = ({ navigation }: RouterProps) => {
	return (
		<View style={styles.container}>
			<Text>RandomOutfit</Text>
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

export default RandomOutfit
