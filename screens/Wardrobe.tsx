import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Wardrobe = () => {
	return (
		<View style={styles.container}>
			<Text>Wardrobe</Text>
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

export default Wardrobe
