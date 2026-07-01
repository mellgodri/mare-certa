import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, statusColor } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import Header from '../components/Header';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function reasons(day) {
  const list = [];
  if (day.windKmh >= 22) list.push(`Vento acima de ${day.windKmh >= 35 ? 35 : 22} km/h`);
  if (day.rainChance >= 50) list.push('Possibilidade de chuva no fim da tarde');
  if (day.waveM >= 1.3) list.push('Ondas aumentando ao longo do dia');
  if (list.length === 0) list.push('Vento, mar e previsão de chuva dentro de níveis seguros');
  return list;
}

// Tela 8 - Resumo das condicoes (tambem usada como aba "Condicoes").
export default function ConditionsDetailScreen() {
  const navigation = useNavigation();
  const { location, conditions, loadConditions } = useApp();

  if (!conditions) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Condições" locationLabel={location ? `${location.name}, ${location.uf}` : null} onPressRefresh={() => loadConditions()} />
        <ErrorState message="Ainda não há dados de condições para esta região." onRetry={() => loadConditions()} />
      </SafeAreaView>
    );
  }

  const { today } = conditions;
  const { fg, label } = statusColor(today.status);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Condições"
        locationLabel={`${location.name}, ${location.uf}`}
        onPressLocation={() => navigation.navigate('LocationSearch')}
        onPressRefresh={() => loadConditions()}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Row label="Condição geral" value={label} />
        <Row label="Temperatura" value={`${today.tempMax}° / ${today.tempMin}°`} />
        <Row label="Sensação térmica" value={`${today.tempMax - 1}°`} />
        <Row label="Possibilidade de chuva" value={`${today.rainChance}%`} />
        <Row label="Vento" value={`${today.windKmh} km/h, direção ${today.windDirection}`} />
        <Row label="Altura das ondas" value={`${today.waveM} m`} />
        <Row label="Temperatura da água" value={`${today.waterTempC}°`} />
        <Row label="Maré atual" value={conditions.tides[0] ? `${conditions.tides[0].type} às ${conditions.tides[0].time}` : '—'} />
        <Row label="Nascer do sol" value={conditions.sunrise} />
        <Row label="Pôr do sol" value={conditions.sunset} />

        <View style={[styles.explainBox, { borderColor: fg }]}>
          <Text style={[styles.explainTitle, { color: fg }]}>Por que o dia está classificado como "{label}"?</Text>
          {reasons(today).map((r, i) => (
            <Text key={i} style={styles.explainItem}>• {r}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, gap: spacing.xs },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { ...typography.body, color: colors.textSecondary },
  rowValue: { ...typography.bodyBold, color: colors.textPrimary },
  explainBox: {
    marginTop: spacing.lg,
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  explainTitle: { ...typography.bodyBold, marginBottom: spacing.sm },
  explainItem: { ...typography.body, color: colors.textPrimary, marginTop: 2 },
});
