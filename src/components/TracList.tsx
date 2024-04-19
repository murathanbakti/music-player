import libary from '@/assets/data/libary.json'
import { FlatList, FlatListProps } from 'react-native'
import { TrackListItem } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<unknown>>

export const TrackList = ({ ...flatlistProps }: TrackListProps) => {
	return (
		<FlatList
			data={libary}
			renderItem={({ item: track }) => (
				<TrackListItem
					track={{
						...track,
						image: track.artwork,
					}}
				/>
			)}
			{...flatlistProps}
		/>
	)
}
