import libary from '@/assets/data/libary.json'
import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibaryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibaryStore = create<LibaryState>()((set) => ({
	tracks: libary,
	toggleTrackFavorite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibaryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibaryStore((state) => state.tracks.filter((track) => track.rating === 1))
	const toggleTrackFavorite = useLibaryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}
