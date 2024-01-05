import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { Layout } from '@ui-kitten/components'

const RandomOutfit = () => {
	return (
		<Layout style={styles.container}>
			<Text>RandomOutfit</Text>
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

export default RandomOutfit
