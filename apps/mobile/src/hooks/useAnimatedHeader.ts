import { useRef } from 'react';
import { Animated } from 'react-native';

interface Options {
  maxHeight: number;
  minHeight: number;
  minScale?: number;
}

export function useAnimatedHeader({
  maxHeight,
  minHeight,
  minScale = 0.7,
}: Options) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const distance = maxHeight - minHeight;

  const height = scrollY.interpolate({
    inputRange: [0, distance],
    outputRange: [maxHeight, minHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, distance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const scale = scrollY.interpolate({
    inputRange: [0, distance],
    outputRange: [1, minScale],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return { height, opacity, scale, onScroll };
}
