import { NavigationContainer } from '@react-navigation/native'
import Main from './screens/Main'
import * as eva from '@eva-design/eva'
import React from 'react'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

export default function App() {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<NavigationContainer>
				<ApplicationProvider
					{...eva}
					theme={eva.light}
				>
					<Main />
				</ApplicationProvider>
			</NavigationContainer>
		</>
	)
}
