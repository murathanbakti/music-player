import libary from '@/assets/data/libary.json'
import { FlatList } from 'react-native'

export const TrackList = () => {
	return <FlatList data={libary} renderItem={() => null} />
}
