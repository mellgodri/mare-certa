import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { radius } from '../theme/typography';

// Esqueleto de carregamento mantendo a estrutura da tela (sem "piscar" agressivo).
export default function SkeletonCard({ height = 80, style }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.skeleton, { height, opacity }, style]}
      accessibilityLabel="Carregando"
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.skeleton,
    borderRadius: radius.md,
    width: '100%',
  },
});
