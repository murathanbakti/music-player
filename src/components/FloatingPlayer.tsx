import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()

	const displayedTrack: Track = activeTrack ?? {
		title: 'this is just a song',
	}
	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<FastImage
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>
				<View style={styles.trackTitleContainer}>
					<Text style={styles.trackTitle}>{displayedTrack.title}</Text>
				</View>
				<View style={styles.trackControllerContainer}>
					<PlayPauseButton iconSize={22} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},

	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControllerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginLeft: 16,
		paddingLeft: 16,
	},
})