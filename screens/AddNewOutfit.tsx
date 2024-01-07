import { StyleSheet, SafeAreaView, Alert } from 'react-native'
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
import { uploadToFirebaseStorage } from '../firebaseConfig'
import { uuidv4 } from '@firebase/util'

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
	const [cameraPermission, requestCameraPermission] =
		ImagePicker.useCameraPermissions()
	const [mediaLibraryPermission, requestMediaLibraryPermission] =
		ImagePicker.useMediaLibraryPermissions()

	const takePhoto = async () => {
		try {
			const cameraResponse = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			})

			if (!cameraResponse.canceled) {
				const { uri } = cameraResponse.assets[0]
				const fileName = uri.split('/').pop() + uuidv4()
				const uploadResponse = await uploadToFirebaseStorage(
					uri,
					fileName,
					(v: any) => console.log(v)
				)
				console.log(uploadResponse)
			}
		} catch (e: any) {
			Alert.alert(`Error Uploading Image: ${e.message}`)
		}
	}

	const uploadPhoto = async () => {
		try {
			const mediaLibraryResponse = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			})

			if (!mediaLibraryResponse.canceled) {
				const { uri } = mediaLibraryResponse.assets[0]
				const fileName = uri.split('/').pop() + uuidv4()
				const uploadResponse = await uploadToFirebaseStorage(
					uri,
					fileName,
					(v: any) => console.log(v)
				)
				console.log(uploadResponse)
			}
		} catch (e: any) {
			Alert.alert(`Error Uploading Image: ${e.message}`)
		}
	}

	const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
		[]
	)

	//look into combining these checks on one screen?

	//camera permission check
	if (cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
		return (
			<Layout
				style={styles.permissionsContainer}
				level='1'
			>
				<SafeAreaView>
					<Text>Permission Not Granted</Text>
					<Button onPress={requestCameraPermission}>Request Permission</Button>
				</SafeAreaView>
			</Layout>
		)
	}

	//mediaLibrary permission check
	if (mediaLibraryPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
		return (
			<Layout
				style={styles.permissionsContainer}
				level='1'
			>
				<SafeAreaView>
					<Text>Media Library Permission Not Granted</Text>
					<Button onPress={requestMediaLibraryPermission}>
						Request Permission
					</Button>
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
					<Button
						accessoryLeft={GridIcon}
						onPress={uploadPhoto}
					>
						Photos
					</Button>
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
