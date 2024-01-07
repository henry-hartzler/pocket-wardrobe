import { StyleSheet, SafeAreaView, Alert, View, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { uploadToFirebaseStorage } from '../firebaseConfig'
import { uuidv4 } from '@firebase/util'
import { Button, Text, Icon, Chip } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'

const seasons = [
	{
		label: 'Summer',
		value: 'summer',
	},
	{
		label: 'Winter',
		value: 'winter',
	},
	{
		label: 'All',
		value: 'all',
	},
]

const category = [
	{
		label: 'Work',
		value: 'work',
	},
	{
		label: 'Casual',
		value: 'casual',
	},
	{
		label: 'Exercise',
		value: 'exercise',
	},
	{
		label: 'Going Out',
		value: 'going out',
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

	//dropdown options
	const [categoryOpen, setCategoryOpen] = useState(false)
	const [categoryValue, setCategoryValue] = useState(null)
	const [categoryItems, setCategoryItems] = useState(category)

	const [seasonOpen, setSeasonOpen] = useState(false)
	const [seasonValue, setSeasonValue] = useState(null)
	const [seasonItems, setSeasonItems] = useState(seasons)

	const onCategoryOpen = useCallback(() => {
		setSeasonOpen(false)
	}, [])

	const onSeasonOpen = useCallback(() => {
		setCategoryOpen(false)
	}, [])

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
			<Text h2>Add New Outfit</Text>
			<View style={styles.innerContainer}>
				<Text
					h4
					style={{ marginRight: 10 }}
				>
					#1 Choose a Photo
				</Text>
				<Chip
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
			</View>
			<View style={styles.innerContainer}>
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

			<Text h4>#2 Select Style</Text>
			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Category</Text>
				<DropDownPicker
					open={categoryOpen}
					value={categoryValue}
					items={categoryItems}
					setOpen={setCategoryOpen}
					setValue={setCategoryValue}
					setItems={setCategoryItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='Category'
					zIndex={3000}
					zIndexInverse={1000}
					onOpen={onCategoryOpen}
				/>
			</View>

			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Season</Text>
				<DropDownPicker
					open={seasonOpen}
					value={seasonValue}
					items={seasonItems}
					setOpen={setSeasonOpen}
					setValue={setSeasonValue}
					setItems={setSeasonItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='Season'
					zIndex={2000}
					zIndexInverse={2000}
					onOpen={onSeasonOpen}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	innerContainer: {
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
	dropdownContainerStyle: { width: 200 },
	dropdownRow: {
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
	},
	labelText: {
		marginRight: 10,
	},
})

export default AddNewOutfit
