import { StyleSheet, View, Platform } from 'react-native'
import Constants from 'expo-constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import Login from './Login'
import RandomOutfit from './RandomOutfit'
import { firebaseAuth } from '../firebaseConfig'
import Profile from './Profile'
import AddNewOutfit from './AddNewOutfit'
import { PersonIcon, PlusIcon, ShuffleIcon } from '../icons/EvaIcons'

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}
	>
		<BottomNavigationTab icon={ShuffleIcon} />
		<BottomNavigationTab icon={PlusIcon} />
		<BottomNavigationTab icon={PersonIcon} />
	</BottomNavigation>
)

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
			}}
			tabBar={(props) => <BottomTabBar {...props} />}
			initialRouteName='Random Outfit'
		>
			<Tab.Screen
				name='Random Outfit'
				component={RandomOutfit}
			/>

			<Tab.Screen
				name='Add New Outfit'
				component={AddNewOutfit}
			/>

			<Tab.Screen
				name='Profile'
				component={Profile}
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
	bottomNavigation: {
		marginVertical: 8,
		paddingBottom: 10,
	},
})

export default Main
