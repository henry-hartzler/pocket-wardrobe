import { NavigationProp } from '@react-navigation/native'

export type RouterProps = {
	navigation: NavigationProp<any, any>
}

export type Fit = {
	pants: string | undefined
	top: string | undefined
	blazer: string | undefined
	cardigan: string | undefined
	summer: boolean | undefined
	winter: boolean | undefined
	img: string | undefined
}