import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

// Card usado na grade de 4 condicoes (Tempo, Vento, Mar, Mare) da tela inicial.
export default function ConditionCard({ icon, label, value, helper, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  icon: { fontSize: 22, marginBottom: spacing.xs },
  label: { ...typography.small, color: colors.textSecondary },
  value: { ...typography.h3, color: colors.textPrimary, marginTop: 2 },
  helper: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
});
