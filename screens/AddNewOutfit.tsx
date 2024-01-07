import { StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import {
	Button,
	IndexPath,
	Layout,
	Select,
	SelectItem,
	Text,
	ButtonGroup,
} from '@ui-kitten/components'
import * as ImagePicker from 'expo-image-picker'
import { CameraIcon, GridIcon } from '../icons/EvaIcons'

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
	const [permission, requestPermission] = ImagePicker.useCameraPermissions()

	const takePhoto = async () => {
		const cameraResponse = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		})

		if (!cameraResponse.canceled) {
			console.log(cameraResponse.assets[0].uri)
		}
	}

	const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
		[]
	)

	//permission check
	if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
		return (
			<Layout
				style={styles.permissionsContainer}
				level='1'
			>
				<SafeAreaView>
					<Text>Permission Not Granted</Text>
					<Button onPress={requestPermission}>Request Permission</Button>
				</SafeAreaView>
			</Layout>
		)
	}

	//main UI
	return (
		<Layout
			style={styles.container}
			level='1'
		>
			<SafeAreaView>
				<Text>Add New Outfit</Text>
				<ButtonGroup>
					<Button
						accessoryLeft={CameraIcon}
						onPress={takePhoto}
					>
						Camera
					</Button>
					<Button accessoryLeft={GridIcon}>Photos</Button>
				</ButtonGroup>
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
	permissionsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
})

export default AddNewOutfit
