import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

function seaMessage(waveM) {
  if (waveM >= 2.0) return 'Mar agitado — atenção ao sair ao mar';
  if (waveM >= 1.3) return 'Mar levemente agitado';
  return 'Mar calmo';
}

// Tela 12 - Condicoes do mar.
export default function SeaScreen() {
  const { conditions, loadConditions } = useApp();
  if (!conditions) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message="Os dados de mar e ondas ainda não estão disponíveis para esta região." onRetry={() => loadConditions()} />
      </SafeAreaView>
    );
  }
  const { today } = conditions;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.message}>{seaMessage(today.waveM)}</Text>
        <Text style={styles.waveRange}>Ondas entre {(today.waveM - 0.3).toFixed(1)} m e {today.waveM.toFixed(1)} m</Text>

        <View style={styles.grid}>
          <InfoBlock label="Altura das ondas" value={`${today.waveM} m`} />
          <InfoBlock label="Direção das ondas" value={today.windDirection} />
          <InfoBlock label="Intervalo entre ondas" value="8 s" />
          <InfoBlock label="Temperatura da água" value={`${today.waterTempC}°`} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoBlock({ label, value }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockLabel}>{label}</Text>
      <Text style={styles.blockValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  message: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.xs },
  waveRange: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'space-between' },
  block: { flexBasis: '48%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  blockLabel: { ...typography.small, color: colors.textSecondary },
  blockValue: { ...typography.h3, color: colors.textPrimary, marginTop: 2 },
});
