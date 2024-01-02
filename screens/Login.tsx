import React, { useState } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import {
	Button,
	Input,
	Layout,
	StyleService,
	Text,
	useStyleSheet,
	Icon,
	Spinner,
} from '@ui-kitten/components'
import { firebaseAuth } from '../firebaseConfig'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { KeyboardAvoidingView } from '../extra/thirdParty'

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	const styles = useStyleSheet(themedStyles)

	const PersonIcon = (props: any) => (
		<Icon
			name='person'
			{...props}
		/>
	)

	const PasswordIcon = (props: any) => (
		<TouchableWithoutFeedback
			onPress={() => setPasswordVisible(!passwordVisible)}
		>
			<Icon
				name={!passwordVisible ? 'eye-off' : 'eye'}
				{...props}
			/>
		</TouchableWithoutFeedback>
	)

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
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text
					category='h1'
					status='control'
				>
					Pocket Wardrobe
				</Text>
				<Text
					style={styles.signInLabel}
					category='s1'
					status='control'
				>
					Sign in to your account
				</Text>
			</View>
			{!loading ? (
				<>
					<Layout
						style={styles.formContainer}
						level='1'
					>
						<Input
							placeholder='Email'
							accessoryRight={PersonIcon}
							value={email}
							onChangeText={setEmail}
						/>
						<Input
							style={styles.passwordInput}
							placeholder='Password'
							accessoryRight={PasswordIcon}
							value={password}
							secureTextEntry={!passwordVisible}
							onChangeText={setPassword}
						/>
						<View style={styles.forgotPasswordContainer}>
							<Button
								style={styles.forgotPasswordButton}
								appearance='ghost'
								status='basic'
								onPress={() => alert('add forgot password function')}
							>
								Forgot your password?
							</Button>
						</View>
					</Layout>
					<Button
						style={styles.signInButton}
						size='giant'
						onPress={signIn}
					>
						SIGN IN
					</Button>
					<Button
						style={styles.signUpButton}
						appearance='ghost'
						status='basic'
						onPress={() => alert('add sign up page')}
					>
						Don't have an account? Create
					</Button>
				</>
			) : (
				<View style={styles.loadingSpinner}>
					<Spinner size='giant' />
				</View>
			)}
		</KeyboardAvoidingView>
	)
}

const themedStyles = StyleService.create({
	container: {
		backgroundColor: 'background-basic-color-1',
	},
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 216,
		backgroundColor: 'color-primary-default',
	},
	formContainer: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 16,
	},
	signInLabel: {
		marginTop: 16,
	},
	signInButton: {
		marginHorizontal: 16,
	},
	signUpButton: {
		marginVertical: 12,
		marginHorizontal: 16,
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	passwordInput: {
		marginTop: 16,
	},
	forgotPasswordButton: {
		paddingHorizontal: 0,
	},
	loadingSpinner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Login
