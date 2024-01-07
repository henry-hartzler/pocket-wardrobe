import React from 'react'
import { Icon, IconElement } from '@ui-kitten/components'

const PersonIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='person-outline'
	/>
)

const ShuffleIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='shuffle-2-outline'
	/>
)

const PlusIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='plus-circle-outline'
	/>
)

const CameraIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='camera-outline'
	/>
)

const GridIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='grid-outline'
	/>
)

export { PersonIcon, ShuffleIcon, PlusIcon, CameraIcon, GridIcon }
