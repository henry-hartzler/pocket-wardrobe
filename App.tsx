import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import Main from './app/screens/Main'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Main />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
