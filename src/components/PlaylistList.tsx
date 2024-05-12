import { unknownTrackImageUri } from '@/constants/images'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { utilsStyles } from '@/styles'
import { useMemo } from 'react'
import { FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { FlatList } from 'react-native-gesture-handler'
import { PlaylistListItem } from './PlaylistListItem'

type PlaylistListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const PlaylistList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...FlatListProps
}: PlaylistListProps) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in Playlists',
		},
	})

	const filteredPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist Found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			data={filteredPlaylist}
			{...FlatListProps}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem
					playlist={playlist}
					onPress={() => {
						handlePlaylistPress(playlist)
					}}
				/>
			)}
		/>
	)
}
