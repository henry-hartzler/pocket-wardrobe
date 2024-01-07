import { StyleSheet, SafeAreaView, Alert, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { uploadToFirebaseStorage } from '../firebaseConfig'
import { uuidv4 } from '@firebase/util'
import { Button, Text, Icon, Chip } from '@rneui/themed'

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
	const [uploadImageSuccess, setUploadImageSuccess] = useState<boolean>(false)

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
		} finally {
			setUploadImageSuccess(true)
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
		} finally {
			setUploadImageSuccess(true)
		}
	}

	//permissions check
	const noCameraPermissions =
		cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED
	const noMediaLibraryPermissions =
		mediaLibraryPermission?.status !== ImagePicker.PermissionStatus.GRANTED

	if (noCameraPermissions || noMediaLibraryPermissions) {
		return (
			<SafeAreaView style={styles.container}>
				{noCameraPermissions && (
					<>
						<Text>Camera Permission Not Granted</Text>
						<Button onPress={requestCameraPermission}>
							Request Permission
							<Icon
								name='camera'
								type='font-awesome'
							/>
						</Button>
					</>
				)}

				{noMediaLibraryPermissions && (
					<>
						<Text>Media Library Permission Not Granted</Text>
						<Button onPress={requestMediaLibraryPermission}>
							Request Permission
							<Icon
								name='image'
								type='font-awesome'
							/>
						</Button>
					</>
				)}
			</SafeAreaView>
		)
	}

	//main UI
	return (
		<SafeAreaView style={styles.container}>
			<Text>Add New Outfit</Text>
			<View style={styles.buttonsContainer}>
				<Button
					title='CAMERA'
					icon={{
						name: 'camera',
						type: 'font-awesome',
						size: 15,
						color: 'white',
					}}
					iconContainerStyle={styles.iconContainerStyle}
					titleStyle={styles.titleStyle}
					buttonStyle={styles.buttonStyle}
					containerStyle={styles.individualButtonsContainer}
					onPress={takePhoto}
				/>
				<Button
					title='UPLOAD IMAGE'
					icon={{
						name: 'upload',
						type: 'font-awesome',
						size: 15,
						color: 'white',
					}}
					iconContainerStyle={styles.iconContainerStyle}
					titleStyle={styles.titleStyle}
					buttonStyle={styles.buttonStyle}
					containerStyle={styles.individualButtonsContainer}
					onPress={uploadPhoto}
				/>
			</View>
			<Chip
				title='Image Upload Successful'
				color='green'
				disabled={!uploadImageSuccess}
				containerStyle={{ marginVertical: 15 }}
				icon={{
					name: 'check',
					type: 'font-awesome',
					size: 20,
					color: 'white',
				}}
				iconRight
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 5,
	},
	individualButtonsContainer: {
		width: 170,
		marginHorizontal: 10,
	},
	buttonStyle: {
		backgroundColor: 'blue',
		borderColor: 'transparent',
		borderWidth: 0,
		borderRadius: 30,
	},
	iconContainerStyle: { marginRight: 10 },
	titleStyle: { fontWeight: '700' },
})

export default AddNewOutfit
