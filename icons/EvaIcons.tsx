import React from 'react'
import { Icon, IconElement } from '@ui-kitten/components'

export const PersonIcon = (props:any): IconElement => (
	<Icon
		{...props}
		name='person-outline'
	/>
)

export const ShuffleIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='shuffle-2-outline'
	/>
)

export const PlusIcon = (props: any): IconElement => (
	<Icon
		{...props}
		name='plus-circle-outline'
	/>
)
