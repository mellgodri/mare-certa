import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

// Tela 15 - Detalhe do alerta.
export default function AlertDetailScreen({ route }) {
  const { alertId } = route.params;
  const navigation = useNavigation();
  const { conditions } = useApp();
  const alert = conditions?.alerts.find((a) => a.id === alertId);

  if (!alert) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message="Este alerta não está mais disponível." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>⚠ {alert.title}</Text>
        <Field label="Tipo de alerta" value={alert.type} />
        <Field label="Nível de atenção" value={alert.level === 'alto' ? 'Alto' : alert.level === 'medio' ? 'Médio' : 'Baixo'} />
        <Field label="Data e horário" value={`${alert.date} · ${alert.window}`} />
        <Field label="Região afetada" value={alert.region} />
        <Field label="Descrição" value={alert.description} />

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationTitle}>Recomendação</Text>
          <Text style={styles.recommendationText}>{alert.recommendation}</Text>
        </View>

        <Field label="Fonte da informação" value={alert.source} />
        <Field label="Última atualização" value={new Date(alert.updatedAt).toLocaleString('pt-BR')} />

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton title="Ver condições completas" onPress={() => navigation.navigate('Main', { screen: 'Condições' })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  title: { ...typography.h2, color: colors.textPrimary, marginBottom: spacing.md },
  field: { marginBottom: spacing.md },
  fieldLabel: { ...typography.small, color: colors.textSecondary },
  fieldValue: { ...typography.body, color: colors.textPrimary, marginTop: 2 },
  recommendationBox: { backgroundColor: colors.infoBg, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  recommendationTitle: { ...typography.smallBold, color: colors.info, marginBottom: 4 },
  recommendationText: { ...typography.body, color: colors.textPrimary },
});
