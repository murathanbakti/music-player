import { ultilStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: any[]
}

const ItemDvider = () => {
	return <View style={{ ...ultilStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	const handleTrackSelect = (track: Track) => {
		console.log(track)
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDvider}
			ItemSeparatorComponent={ItemDvider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}
