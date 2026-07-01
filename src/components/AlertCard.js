import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

const LEVEL_COLOR = {
  alto: colors.naoRecomendado,
  medio: colors.atencao,
  baixo: colors.info,
};

export default function AlertCard({ alert, onPress }) {
  const color = LEVEL_COLOR[alert.level] || colors.info;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.stripe, { backgroundColor: color }]} />
      <View style={styles.content}>
        <Text style={styles.title}>⚠ {alert.title}</Text>
        <Text style={styles.meta}>{alert.window ? `${alert.date} · ${alert.window}` : alert.date}</Text>
        <Text style={styles.description}>{alert.description}</Text>
        <Text style={[styles.link, { color }]}>Ver detalhes</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  stripe: { width: 6 },
  content: { flex: 1, padding: spacing.md },
  title: { ...typography.bodyBold, color: colors.textPrimary },
  meta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  description: { ...typography.small, color: colors.textPrimary, marginTop: spacing.xs },
  link: { ...typography.smallBold, marginTop: spacing.xs },
});
