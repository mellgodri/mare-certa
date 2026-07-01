import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

// Tela 13 - Mare. O grafico e apenas um apoio visual simples (barras), nao
// um grafico tecnico detalhado.
export default function TideScreen() {
  const { conditions, loadConditions } = useApp();
  if (!conditions) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState onRetry={() => loadConditions()} />
      </SafeAreaView>
    );
  }
  const { tides } = conditions;
  const maxHeight = Math.max(...tides.map((t) => t.heightM));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.current}>Maré atual: subindo</Text>

        <View style={styles.chart}>
          {tides.map((t, i) => (
            <View key={i} style={styles.barWrap}>
              <View style={[styles.bar, { height: 16 + (t.heightM / maxHeight) * 80 }]} />
              <Text style={styles.barLabel}>{t.time}</Text>
            </View>
          ))}
        </View>

        {tides.map((t, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rowLabel}>{t.type === 'alta' ? 'Maré alta' : 'Maré baixa'}</Text>
            <Text style={styles.rowValue}>{t.time} — {t.heightM} m</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  current: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.lg },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  barWrap: { alignItems: 'center', gap: spacing.xs },
  bar: { width: 28, backgroundColor: colors.accent, borderRadius: 6 },
  barLabel: { ...typography.caption, color: colors.textSecondary },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { ...typography.body, color: colors.textSecondary },
  rowValue: { ...typography.bodyBold, color: colors.textPrimary },
});
