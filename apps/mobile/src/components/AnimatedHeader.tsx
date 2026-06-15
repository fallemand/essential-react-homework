import { StyleSheet, Animated } from 'react-native';
import type { ReactNode } from 'react';

interface AnimatedHeaderProps {
  height: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
  scale: Animated.AnimatedInterpolation<string | number>;
  children: ReactNode;
}

export function AnimatedHeader({
  height,
  opacity,
  scale,
  children,
}: AnimatedHeaderProps) {
  return (
    <Animated.View style={[styles.header, { height, opacity }]}>
      <Animated.Text style={[styles.title, { transform: [{ scale }] }]}>
        {children}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
