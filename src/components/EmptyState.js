import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';

export default function EmptyState({ icon = '🔍', title, suggestions = [] }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {suggestions.map((s, i) => (
        <Text key={i} style={styles.suggestion}>• {s}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: spacing.xl },
  icon: { fontSize: 36, marginBottom: spacing.sm },
  title: { ...typography.bodyBold, color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.sm },
  suggestion: { ...typography.small, color: colors.textSecondary, alignSelf: 'flex-start' },
});
