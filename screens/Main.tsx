import { StyleSheet, View, Platform } from 'react-native'
import Constants from 'expo-constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Login from './Login'
import RandomOutfit from './RandomOutfit'
import { firebaseAuth } from '../firebaseConfig'
import Profile from './Profile'
import AddNewOutfit from './AddNewOutfit'
import Wardrobe from './Wardrobe'

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: styles.mainFooter.backgroundColor,
				},
				tabBarActiveTintColor: '#fff',
				tabBarShowLabel: false,
				headerShown: false,
			}}
			initialRouteName='Random Outfit'
		>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused }) => (
						<Icon
							name={focused ? 'account-circle' : 'account-circle-outline'}
							type='material-community'
							size={24}
							iconStyle={{ width: 24 }}
							color={styles.mainFooter.color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Add New Outfit'
				component={AddNewOutfit}
				options={{
					title: 'Add New Outfit',
					tabBarIcon: ({ focused }) => (
						<Icon
							name={focused ? 'add-circle' : 'add-circle-outline'}
							type='material'
							size={24}
							iconStyle={{ width: 24 }}
							color={styles.mainFooter.color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Random Outfit'
				component={RandomOutfit}
				options={{
					title: 'Random Outfit',
					tabBarIcon: ({ focused }) => (
						<Icon
							name={focused ? 'shuffle-on' : 'shuffle'}
							type='material'
							size={24}
							iconStyle={{ width: 24 }}
							color={styles.mainFooter.color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Wardrobe'
				component={Wardrobe}
				options={{
					title: 'Wardrobe',
					tabBarIcon: ({ focused }) => (
						<Icon
							name={focused ? 'view-grid' : 'view-grid-outline'}
							type='material-community'
							size={24}
							iconStyle={{ width: 24 }}
							color={styles.mainFooter.color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

const Stack = createNativeStackNavigator()

const Main = () => {
	//make fetch calls here
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			setUser(user)
		})
	}, [])

	return (
		<View
			style={{
				flex: 1,
				paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
			}}
		>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName='Login'
			>
				{user ? (
					<Stack.Screen
						name='Home'
						component={HomeTabs}
					/>
				) : (
					<Stack.Screen
						name='Login'
						component={Login}
					/>
				)}
			</Stack.Navigator>
		</View>
	)
}

const styles = StyleSheet.create({
	mainFooter: {
		backgroundColor: 'white',
		color: 'black',
		padding: 100,
	},
})

export default Main
