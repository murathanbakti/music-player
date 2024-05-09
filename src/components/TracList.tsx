import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { QueueControls } from './QueueControls'
import { TrackListItem } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: any[]
	hideQueueControls?: boolean
}

const ItemDvider = () => {
	return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
}

export const TrackList = ({
	id,
	tracks,
	hideQueueControls = false,
	...flatlistProps
}: TrackListProps) => {
	const queueOffSet = useRef(0)
	const { activeQueueID, setActiveQueueID } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueID

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()

			// we Construct the ne w queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffSet.current = trackIndex
			setActiveQueueID(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffSet.current < 0
					? tracks.length + trackIndex - queueOffSet.current
					: trackIndex - queueOffSet.current

			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
		}
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
				) : undefined
			}
			ListFooterComponent={ItemDvider}
			ItemSeparatorComponent={ItemDvider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No Songs Found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
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
