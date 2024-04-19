import { TrackList } from '@/components/TracList'
import { defaultStyles } from '@/styles'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<ScrollView>
				<TrackList scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
