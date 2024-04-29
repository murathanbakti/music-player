import { TrackList } from '@/components/TracList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/libary'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in Sonng',
		},
	})

	const favoriteTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoriteTracks
		return favoriteTracks.filter(trackTitleFilter(search))
	}, [search, favoriteTracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TrackList scrollEnabled={false} tracks={filteredFavoritesTracks} />
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
