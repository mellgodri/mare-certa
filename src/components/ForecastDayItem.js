import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, statusColor } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function dayLabel(dayOffset, dateStr) {
  if (dayOffset === 0) return 'Hoje';
  if (dayOffset === 1) return 'Amanhã';
  const date = new Date(dateStr);
  return WEEKDAYS[date.getDay()];
}

export default function ForecastDayItem({ day, onPress }) {
  const { fg, bg, label } = statusColor(day.status);
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Text style={styles.day}>{dayLabel(day.dayOffset, day.date)}</Text>
      <Text style={styles.sky} numberOfLines={1}>{day.sky}</Text>
      <Text style={styles.temp}>{day.tempMax}° / {day.tempMin}°</Text>
      <View style={[styles.pill, { backgroundColor: bg }]}>
        <Text style={[styles.pillText, { color: fg }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  day: { ...typography.smallBold, color: colors.textPrimary, width: 78 },
  sky: { ...typography.small, color: colors.textSecondary, flex: 1 },
  temp: { ...typography.small, color: colors.textPrimary, width: 70 },
  pill: { borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  pillText: { ...typography.caption, fontWeight: '700' },
});
