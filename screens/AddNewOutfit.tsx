import React, { useCallback, useState } from 'react'
import { StyleSheet, SafeAreaView, Alert, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {
	firebaseDb,
	uploadToFirebaseStorage,
	firebaseAuth,
} from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { uuidv4 } from '@firebase/util'
import { Button, Text, Icon, Chip } from '@rneui/themed'
import DropDownPicker, {
	ItemType,
	ValueType,
} from 'react-native-dropdown-picker'
import { Outfit } from '../types'

const makeOptions = (strArr: string[]): ItemType<ValueType>[] => {
	const arrOfDropObj: ItemType<ValueType>[] = [
		{ label: 'select', value: undefined },
	]
	strArr.forEach((item) => arrOfDropObj.push({ label: item, value: item }))
	return arrOfDropObj
}

const pantsArr = ['black', 'green', 'tan', 'navy']
const blazerArr = ['yes', 'no']
const cardiganArr = ['navy', 'tan', 'black', 'green']
const topArr = [
	'black',
	'tan',
	'white',
	'green',
	'maroon',
	'pink',
	'blue',
	'grey',
	'rust',
]
const seasonsArr = ['summer', 'winter', 'any']
const categoryArr = ['work', 'exercise', 'casual', 'going out']

const pantsOptions = makeOptions(pantsArr)

const topOptions = makeOptions(topArr)

const blazerOptions = makeOptions(blazerArr)

const cardiganOptions = makeOptions(cardiganArr)

const seasonOptions = makeOptions(seasonsArr)

const categoryOptions = makeOptions(categoryArr)

const AddNewOutfit = () => {
	const [uploadImageSuccess, setUploadImageSuccess] = useState<boolean>(false)
	const [imgPath, setImgPath] = useState<string | undefined>(undefined)

	const [cameraPermission, requestCameraPermission] =
		ImagePicker.useCameraPermissions()

	const [mediaLibraryPermission, requestMediaLibraryPermission] =
		ImagePicker.useMediaLibraryPermissions()

	const takePhoto = async () => {
		try {
			const cameraResponse = await ImagePicker.launchCameraAsync({
				allowsEditing: false,
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
				setImgPath(fileName)
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
				allowsEditing: false,
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
				setImgPath(fileName)
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
	const [categoryItems, setCategoryItems] = useState(categoryOptions)

	const [seasonOpen, setSeasonOpen] = useState(false)
	const [seasonValue, setSeasonValue] = useState(null)
	const [seasonItems, setSeasonItems] = useState(seasonOptions)

	const [blazerOpen, setBlazerOpen] = useState(false)
	const [blazerValue, setBlazerValue] = useState(null)
	const [blazerItems, setBlazerItems] = useState(blazerOptions)

	const [cardiganOpen, setCardiganOpen] = useState(false)
	const [cardiganValue, setCardiganValue] = useState(null)
	const [cardiganItems, setCardiganItems] = useState(cardiganOptions)

	const [topOpen, setTopOpen] = useState(false)
	const [topValue, setTopValue] = useState(null)
	const [topItems, setTopItems] = useState(topOptions)

	const [pantsOpen, setPantsOpen] = useState(false)
	const [pantsValue, setPantsValue] = useState(null)
	const [pantsItems, setPantsItems] = useState(pantsOptions)

	const onCategoryOpen = useCallback(() => {
		setSeasonOpen(false)
		setBlazerOpen(false)
		setCardiganOpen(false)
		setTopOpen(false)
		setPantsOpen(false)
	}, [])

	const onSeasonOpen = useCallback(() => {
		setCategoryOpen(false)
		setBlazerOpen(false)
		setCardiganOpen(false)
		setTopOpen(false)
		setPantsOpen(false)
	}, [])

	const onBlazerOpen = useCallback(() => {
		setCategoryOpen(false)
		setSeasonOpen(false)
		setCardiganOpen(false)
		setTopOpen(false)
		setPantsOpen(false)
	}, [])

	const onCardiganOpen = useCallback(() => {
		setCategoryOpen(false)
		setSeasonOpen(false)
		setBlazerOpen(false)
		setTopOpen(false)
		setPantsOpen(false)
	}, [])

	const onTopOpen = useCallback(() => {
		setCategoryOpen(false)
		setSeasonOpen(false)
		setBlazerOpen(false)
		setCardiganOpen(false)
		setPantsOpen(false)
	}, [])

	const onPantsOpen = useCallback(() => {
		setCategoryOpen(false)
		setSeasonOpen(false)
		setBlazerOpen(false)
		setCardiganOpen(false)
		setTopOpen(false)
	}, [])

	const currentUserId = firebaseAuth.currentUser?.uid

	const outfitToUpload: Outfit = {
		category: categoryValue,
		season: seasonValue,
		blazer: blazerValue,
		cardigan: cardiganValue,
		top: topValue,
		pants: pantsValue,
		img: imgPath,
		userId: currentUserId,
	}

	const allOptionsHaveValues: boolean | null =
		categoryValue &&
		seasonValue &&
		blazerValue &&
		cardiganValue &&
		topValue &&
		pantsValue &&
		imgPath &&
		currentUserId

	const [loading, setLoading] = useState<boolean>(false)

	const resetOptions = () => {
		setCategoryValue(null)
		setSeasonValue(null)
		setBlazerValue(null)
		setCardiganValue(null)
		setTopValue(null)
		setPantsValue(null)
		setImgPath(undefined)
		setUploadImageSuccess(false)
	}

	const uploadNewOutfit = async () => {
		try {
			const docRef = await addDoc(
				collection(firebaseDb, 'outfits'),
				outfitToUpload
			)
			Alert.alert('Outfit Upload Success!')
		} catch (e: any) {
			Alert.alert('Error adding document: ', e)
		} finally {
			setLoading(false)
			resetOptions()
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
					placeholder='select'
					zIndex={60}
					zIndexInverse={10}
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
					placeholder='select'
					zIndex={50}
					zIndexInverse={20}
					onOpen={onSeasonOpen}
				/>
			</View>

			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Blazer</Text>
				<DropDownPicker
					open={blazerOpen}
					value={blazerValue}
					items={blazerItems}
					setOpen={setBlazerOpen}
					setValue={setBlazerValue}
					setItems={setBlazerItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='select'
					zIndex={40}
					zIndexInverse={30}
					onOpen={onBlazerOpen}
				/>
			</View>

			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Cardigan</Text>
				<DropDownPicker
					open={cardiganOpen}
					value={cardiganValue}
					items={cardiganItems}
					setOpen={setCardiganOpen}
					setValue={setCardiganValue}
					setItems={setCardiganItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='select'
					zIndex={30}
					zIndexInverse={40}
					onOpen={onCardiganOpen}
				/>
			</View>

			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Top</Text>
				<DropDownPicker
					open={topOpen}
					value={topValue}
					items={topItems}
					setOpen={setTopOpen}
					setValue={setTopValue}
					setItems={setTopItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='select'
					zIndex={20}
					zIndexInverse={50}
					onOpen={onTopOpen}
				/>
			</View>

			<View style={styles.dropdownRow}>
				<Text style={styles.labelText}>Pants</Text>
				<DropDownPicker
					open={pantsOpen}
					value={pantsValue}
					items={pantsItems}
					setOpen={setPantsOpen}
					setValue={setPantsValue}
					setItems={setPantsItems}
					containerStyle={styles.dropdownContainerStyle}
					placeholder='select'
					zIndex={10}
					zIndexInverse={60}
					onOpen={onPantsOpen}
				/>
			</View>

			<Button
				title='UPLOAD NEW OUTFIT'
				icon={{
					name: 'upload',
					type: 'font-awesome',
					size: 15,
					color: 'white',
				}}
				iconContainerStyle={styles.iconContainerStyle}
				titleStyle={styles.titleStyle}
				buttonStyle={styles.buttonStyle}
				containerStyle={{ width: 230, marginHorizontal: 10 }}
				disabled={!allOptionsHaveValues || loading}
				loading={loading}
				onPress={() => (setLoading(true), uploadNewOutfit())}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 20,
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
