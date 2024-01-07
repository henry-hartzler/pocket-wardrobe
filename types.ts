import { NavigationProp } from '@react-navigation/native'

export type RouterProps = {
	navigation: NavigationProp<any, any>
}

export type Outfit = {
	category: string | undefined
	season: string[] | undefined
	blazer: string | undefined
	cardigan: string | undefined
	top: string | undefined
	pants: string | undefined
	img: string | undefined
	userId: string | undefined
}
