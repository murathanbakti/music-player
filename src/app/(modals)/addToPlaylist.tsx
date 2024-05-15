import { PlaylistList } from '@/components/PlaylistList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'

const AddToPlaylist = () => {
	const router = useRouter()
	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const { activeQueueID } = useQueue()
	const headerHeight = useHeaderHeight()

	const tracks = useTracks()

	const { playlists, addToPlaylist } = usePlaylists()

	const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)

	// track was not found
	if (!track) return null

	const avaiblePlaylist = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === trackUrl),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)

		//should close the modal
		router.dismiss()

		// if the current queue is the playlist we are adding to, add track to end of the queue
		if (activeQueueID?.startsWith(playlist.name)) {
			await TrackPlayer.add(track)
		}
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistList playlists={avaiblePlaylist} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

export default AddToPlaylist

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})
