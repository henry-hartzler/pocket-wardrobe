import { NavigationProp } from '@react-navigation/native'

export type RouterProps = {
	navigation: NavigationProp<any, any>
}

export type Outfit = {
	category: string | undefined | null
	season: string[] | undefined | null
	blazer: string | undefined | null
	cardigan: string | undefined | null
	top: string | undefined | null
	pants: string | undefined | null
	img: string | undefined
	userId: string | undefined | null
	outfitId: string | undefined
	dateLastWorn?: string | undefined | null
	dateUploaded: string | undefined
}
