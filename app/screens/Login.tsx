import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { firebaseAuth } from '../../firebaseConfig'

const Login = () => {
	const [email, setEmail] = useState<string | undefined>(undefined)
	const [password, setPassword] = useState<string | undefined>(undefined)
	const [loading, setLoading] = useState<string | undefined>(undefined)

	const auth = firebaseAuth

	return (
		<View>
			<Text>Login</Text>
		</View>
	)
}

export default Login
