import { Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components'

const seasons = [
	{
		id: 0,
		name: 'Summer',
	},
	{
		id: 1,
		name: 'Winter',
	},
]
const AddNewOutfit = () => {
	const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
		[]
	)

	return (
		<Layout
			style={styles.container}
			level='1'
		>
			<SafeAreaView>
				<Text>Add New Outfit</Text>
				<Select
					multiSelect={true}
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
					label='Season'
					value={
						selectedIndex[0]?.row === 0 && selectedIndex[1]?.row === 1
							? 'Summer Winter'
							: selectedIndex[0]?.row === 0
							? 'Summer'
							: selectedIndex[0]?.row === 1
							? 'Winter'
							: ''
					}
				>
					{seasons.map((item) => (
						<SelectItem
							key={item.name + String(item.id)}
							title={item.name}
						/>
					))}
				</Select>
			</SafeAreaView>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: 128,
	},
})

export default AddNewOutfit
