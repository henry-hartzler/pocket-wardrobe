import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const RandomOutfit = () => {
	return (
		<View style={styles.container}>
			<Text>RandomOutfit</Text>
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
