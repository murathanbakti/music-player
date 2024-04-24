import { useEffect } from 'react'
import Animated, {
	cancelAnimation,
	Easing,
	StyleProps,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animationTreshold: number
	style: StyleProps
}

export const MovingText = ({ text, animationTreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimated = text.length >= animationTreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimated) return

		translateX.value = withDelay(
			1000,
			withRepeat(
				withTiming(-textWidth, {
					duration: 5000,
					easing: Easing.linear,
				}),
				-1,
				true,
			),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, text, animationTreshold, shouldAnimated, textWidth])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				shouldAnimated && {
					width: 9999, // preventing the ellips from appeiring
					paddingLeft: 16,
				},
			]}
		>
			{text}
		</Animated.Text>
	)
}
