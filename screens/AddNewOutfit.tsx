import React, { useCallback, useState } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Alert,
	View,
	ActivityIndicator,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {
	firebaseDb,
	uploadToFirebaseStorage,
	firebaseAuth,
	firebaseStorage,
	deleteImageFile,
} from '../firebaseConfig'
import { ref, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { uuidv4 } from '@firebase/util'
import {
	Button,
	Text,
	Icon,
	Header,
	Image,
	BottomSheet,
	FAB,
} from '@rneui/themed'
import DropDownPicker, {
	ItemType,
	ValueType,
} from 'react-native-dropdown-picker'
import { Outfit } from '../types'

const makeOptions = (strArr: string[]): ItemType<ValueType>[] => {
	const arrOfDropObj: ItemType<ValueType>[] = [
		{ label: 'select', value: undefined, testID: 'select' + uuidv4() },
	]
	strArr.forEach((item) =>
		arrOfDropObj.push({ label: item, value: item, testID: item + uuidv4() })
	)
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
	const [loading, setLoading] = useState<boolean>(false)

	const [uploadImageSuccess, setUploadImageSuccess] = useState<boolean>(false)

	const [currentImgUrl, setCurrentImgUrl] = useState<string | undefined>(
		undefined
	)

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
				await uploadToFirebaseStorage(uri, fileName, (v: any) => console.log(v))

				setUploadImageSuccess(true)

				getDownloadURL(ref(firebaseStorage, `outfitImages/${fileName}`))
					.then((url) => {
						setCurrentImgUrl(url)
					})
					.catch((error: any) => {
						Alert.alert(
							`There was an error retrieving the image url from the database: ${error}`
						)
					})
			}
		} catch (e: any) {
			Alert.alert(`Error Uploading Image: ${e.message}`)
		} finally {
			setLoading(false)
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
				await uploadToFirebaseStorage(uri, fileName, (v: any) => console.log(v))

				setUploadImageSuccess(true)

				getDownloadURL(ref(firebaseStorage, `outfitImages/${fileName}`))
					.then((url) => {
						setCurrentImgUrl(url)
					})
					.catch((error: any) => {
						Alert.alert(
							`There was an error retrieving the image url from the database: ${error}`
						)
					})
			}
		} catch (e: any) {
			Alert.alert(`Error Uploading Image: ${e.message}`)
		} finally {
			setLoading(false)
		}
	}

	const deleteCurrentPhoto = async () => {
		try {
			await deleteImageFile(currentImgUrl)
		} catch {
			Alert.alert(
				'There was an error deleting the current image from the database'
			)
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
		img: currentImgUrl,
		userId: currentUserId,
		dateUploaded: new Date().toISOString(),
	}

	const resetOptions = () => {
		setCategoryValue(null)
		setSeasonValue(null)
		setBlazerValue(null)
		setCardiganValue(null)
		setTopValue(null)
		setPantsValue(null)
		setCurrentImgUrl(undefined)
		setUploadImageSuccess(false)
	}

	const uploadNewOutfit = async () => {
		try {
			const docRef = await addDoc(
				collection(firebaseDb, `outfits${currentUserId}`),
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

	const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false)

	//permissions check
	const noCameraPermissions =
		cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED
	const noMediaLibraryPermissions =
		mediaLibraryPermission?.status !== ImagePicker.PermissionStatus.GRANTED

	if (noCameraPermissions || noMediaLibraryPermissions) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.innerContainer}>
					{noCameraPermissions && (
						<>
							<Text h4>Camera Permission Not Granted</Text>
							<Button
								title='Request Permission'
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
								onPress={requestCameraPermission}
							/>
						</>
					)}

					{noMediaLibraryPermissions && (
						<>
							<Text h4>Media Library Permission Not Granted</Text>
							<Button
								title='Request Permission'
								icon={{
									name: 'image',
									type: 'font-awesome',
									size: 15,
									color: 'white',
								}}
								iconContainerStyle={styles.iconContainerStyle}
								titleStyle={styles.titleStyle}
								buttonStyle={styles.buttonStyle}
								containerStyle={styles.individualButtonsContainer}
								onPress={requestMediaLibraryPermission}
							/>
						</>
					)}
				</View>
			</SafeAreaView>
		)
	}

	//main UI
	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<View style={styles.innerContainer}>
					<ActivityIndicator
						color='blue'
						size='large'
					/>
				</View>
			) : !uploadImageSuccess ? (
				<View style={styles.innerContainer}>
					<View style={styles.firstScreenItem}>
						<Text h2>Choose a Photo</Text>
					</View>

					<View style={styles.firstScreenItem}>
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
							onPress={() => (setLoading(true), takePhoto())}
						/>
					</View>

					<View style={styles.firstScreenItem}>
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
							onPress={() => (setLoading(true), uploadPhoto())}
						/>
					</View>
				</View>
			) : (
				<>
					<Header
						containerStyle={styles.headerContainer}
						leftComponent={
							<TouchableOpacity
								onPress={() => (deleteCurrentPhoto(), resetOptions())}
							>
								<Icon
									name='chevron-left'
									type='font-awesome'
									color='black'
								/>
							</TouchableOpacity>
						}
						leftContainerStyle={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
						centerComponent={<Text h3>Select Styles</Text>}
						rightComponent={
							<TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
								<Icon
									name='image'
									type='font-awesome'
									color='black'
								/>
							</TouchableOpacity>
						}
						rightContainerStyle={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					/>
					<BottomSheet
						isVisible={bottomSheetVisible}
						onBackdropPress={() => setBottomSheetVisible(false)}
						containerStyle={styles.bottomSheet}
						backdropStyle={{ backgroundColor: 'white' }}
					>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Image
								style={{ height: 500, width: 300 }}
								source={{ uri: currentImgUrl }}
								PlaceholderContent={<ActivityIndicator />}
								resizeMode='contain'
							/>

							<FAB
								visible
								icon={{
									name: 'close',
									type: 'font-awesome',
									color: 'black',
								}}
								color='white'
								size='large'
								onPress={() => setBottomSheetVisible(false)}
								style={{ marginTop: 20 }}
							/>
						</View>
					</BottomSheet>
					<ScrollView>
						<View style={styles.innerContainer}>
							<View
								style={{
									marginVertical: 20,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: categoryOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={`value` + uuidv4()}
									onOpen={onCategoryOpen}
								/>
							</View>
							<View
								style={{
									marginVertical: 15,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: seasonOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={`value` + uuidv4()}
									onOpen={onSeasonOpen}
								/>
							</View>
							<View
								style={{
									marginVertical: 15,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: blazerOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={`value` + uuidv4()}
									onOpen={onBlazerOpen}
								/>
							</View>
							<View
								style={{
									marginVertical: 15,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: cardiganOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={`value` + uuidv4()}
									onOpen={onCardiganOpen}
								/>
							</View>
							<View
								style={{
									marginVertical: 15,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: topOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={`value` + uuidv4()}
									onOpen={onTopOpen}
								/>
							</View>
							<View
								style={{
									marginVertical: 15,
									flexDirection: 'row',
									alignItems: 'center',
									marginHorizontal: 20,
									zIndex: pantsOpen ? 1 : 0,
								}}
							>
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
									listMode='SCROLLVIEW'
									itemKey={'value' + uuidv4()}
									onOpen={onPantsOpen}
								/>
							</View>
							<View style={styles.firstScreenItem}>
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
									containerStyle={styles.individualButtonsContainer}
									disabled={loading}
									loading={loading}
									onPress={() => (setLoading(true), uploadNewOutfit())}
								/>
							</View>
						</View>
					</ScrollView>
				</>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	firstScreenItem: {
		marginVertical: 20,
	},
	individualButtonsContainer: {
		width: 250,
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
	labelText: {
		marginRight: 10,
	},
	headerContainer: {
		width: '100%',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	bottomSheet: {
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		width: 'auto',
		flex: 1,
		paddingTop: 50,
	},
})

export default AddNewOutfit
