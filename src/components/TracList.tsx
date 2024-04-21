import { unknownTrackImageUri } from '@/constants/images'
import { ultilStyles } from '@/styles'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: any[]
}

const ItemDvider = () => {
	return <View style={{ ...ultilStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDvider}
			ItemSeparatorComponent={ItemDvider}
			ListEmptyComponent={
				<View>
					<Text style={ultilStyles.emptyContentText}>No Songs Found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={ultilStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}
