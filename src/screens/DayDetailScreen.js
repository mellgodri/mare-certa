import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, statusColor } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import SecondaryButton from '../components/SecondaryButton';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

// Tela 10 - Detalhamento do dia.
export default function DayDetailScreen({ route }) {
  const { date } = route.params;
  const { conditions } = useApp();
  const day = conditions?.forecast.find((d) => d.date === date);

  if (!day) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message="Não foi possível carregar este dia." />
      </SafeAreaView>
    );
  }

  const { fg, bg, label } = statusColor(day.status);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.date}>{new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</Text>

        <View style={[styles.indicator, { backgroundColor: bg, borderColor: fg }]}>
          <Text style={[styles.indicatorText, { color: fg }]}>{label}</Text>
        </View>

        <Text style={styles.sectionTitle}>Previsão por período</Text>
        <View style={styles.periodRow}>
          <PeriodCard title="Manhã" sky={day.sky} temp={day.tempMin} />
          <PeriodCard title="Tarde" sky={day.rainChance > 50 ? 'Chuvoso' : day.sky} temp={day.tempMax} />
          <PeriodCard title="Noite" sky="Nublado" temp={day.tempMin - 2} />
        </View>

        <Text style={styles.sectionTitle}>Detalhes</Text>
        <Text style={styles.line}>Vento: {day.windKmh} km/h (rajadas de {day.windGustKmh} km/h)</Text>
        <Text style={styles.line}>Possibilidade de chuva: {day.rainChance}%</Text>
        <Text style={styles.line}>Melhor horário para pesca: {day.bestWindowStart} às {day.bestWindowEnd}</Text>

        <Text style={styles.sectionTitle}>Horários de maré</Text>
        {conditions.tides.map((t, i) => (
          <Text key={i} style={styles.line}>{t.type === 'alta' ? 'Maré alta' : 'Maré baixa'}: {t.time} — {t.heightM} m</Text>
        ))}

        <View style={{ marginTop: spacing.lg }}>
          <SecondaryButton
            title="Criar lembrete para este dia"
            onPress={() => Alert.alert('Em breve', 'Essa funcionalidade está prevista para uma próxima versão do aplicativo.')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PeriodCard({ title, sky, temp }) {
  return (
    <View style={styles.periodCard}>
      <Text style={styles.periodTitle}>{title}</Text>
      <Text style={styles.periodSky}>{sky}</Text>
      <Text style={styles.periodTemp}>{temp}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  date: { ...typography.h3, color: colors.textPrimary, textTransform: 'capitalize', marginBottom: spacing.sm },
  indicator: { borderRadius: radius.md, borderWidth: 1.5, padding: spacing.md, marginBottom: spacing.md },
  indicatorText: { ...typography.h3 },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.sm },
  line: { ...typography.body, color: colors.textPrimary, marginBottom: 4 },
  periodRow: { flexDirection: 'row', gap: spacing.sm },
  periodCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    alignItems: 'center',
  },
  periodTitle: { ...typography.smallBold, color: colors.textSecondary },
  periodSky: { ...typography.caption, color: colors.textSecondary, marginTop: 2, textAlign: 'center' },
  periodTemp: { ...typography.h3, color: colors.textPrimary, marginTop: 4 },
});
