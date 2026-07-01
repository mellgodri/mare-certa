import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import ForecastDayItem from '../components/ForecastDayItem';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

function windMessage(kmh) {
  if (kmh >= 35) return 'Vento forte — atenção ao sair ao mar';
  if (kmh >= 22) return 'Vento moderado a forte';
  return 'Vento fraco a moderado';
}

// Tela 11 - Vento.
export default function WindScreen({ navigation }) {
  const { conditions, loadConditions } = useApp();
  if (!conditions) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState onRetry={() => loadConditions()} />
      </SafeAreaView>
    );
  }
  const { today } = conditions;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.message}>{windMessage(today.windKmh)}</Text>
        <View style={styles.compassRow}>
          <Text style={styles.compass}>🧭</Text>
          <View>
            <Text style={styles.speed}>{today.windKmh} km/h</Text>
            <Text style={styles.detail}>Direção: {today.windDirection} · Rajadas de até {today.windGustKmh} km/h</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Previsão por dia</Text>
        {conditions.forecast.map((day) => (
          <ForecastDayItem key={day.date} day={day} onPress={() => navigation.navigate('DayDetail', { date: day.date })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  message: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.md },
  compassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  compass: { fontSize: 36 },
  speed: { ...typography.h2, color: colors.textPrimary },
  detail: { ...typography.small, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.sm },
});
