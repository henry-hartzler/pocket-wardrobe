import { StyleSheet, View, Platform } from 'react-native'
import Constants from 'expo-constants'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'

import { useEffect } from 'react'
import Login from './Login'
import RandomOutfit from './RandomOutfit'

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
			initialRouteName='RandomOutfit'
		>
			<Tab.Screen
				name='To Do'
				component={RandomOutfit}
				options={{
					title: 'Random Outfit',
					tabBarIcon: () => (
						<Icon
							name='random'
							type='font-awesome'
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
	useEffect(() => {
		console.log('begin')
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
				<Stack.Screen
					name='Home'
					component={HomeTabs}
				/>
				<Stack.Screen
					name='Login'
					component={Login}
				/>
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
