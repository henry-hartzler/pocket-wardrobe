import React, { useState } from 'react'
import {
	View,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native'
import { Input, Button } from '@rneui/themed'
import { firebaseAuth } from '../../firebaseConfig'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const auth = firebaseAuth

	const signIn = async () => {
		setLoading(true)
		try {
			const response = await signInWithEmailAndPassword(auth, email, password)
			console.log(response)
		} catch (error: any) {
			console.log(error)
			alert(`Sign in failed: ${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	const signUp = async () => {
		setLoading(true)
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			alert('Sign-up successful')
			console.log(response)
		} catch (error: any) {
			console.log(error)
			alert(`Sign up failed: ${error.message}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior='padding'>
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

				{loading ? (
					<ActivityIndicator
						size='large'
						color='#0000ff'
					/>
				) : (
					<>
						<Button
							title='Login'
							onPress={signIn}
							disabled={email.length === 0 || password.length === 0}
						/>
						<Button
							title='Create account'
							onPress={signUp}
							disabled={email.length === 0 || password.length === 0}
						/>
					</>
				)}
			</KeyboardAvoidingView>
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
