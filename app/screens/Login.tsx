import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input } from '@rneui/themed'
import { firebaseAuth } from '../../firebaseConfig'

const Login = () => {
	const [email, setEmail] = useState<string | undefined>(undefined)
	const [password, setPassword] = useState<string | undefined>(undefined)
	const [loading, setLoading] = useState<string | undefined>(undefined)

	const auth = firebaseAuth

	return (
		<View style={styles.container}>
			<Input
				placeholder='E-mail'
				autoCapitalize='none'
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Input
				placeholder='Password'
				autoCapitalize='none'
				value={password}
				secureTextEntry={true}
				onChangeText={(text) => setPassword(text)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
		justifyContent: 'center',
	},
})

export default Login
