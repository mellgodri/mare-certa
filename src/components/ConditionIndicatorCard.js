import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, statusColor } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

const MESSAGES = {
  favoravel: 'As condições estão adequadas para sair ao mar.',
  atencao: 'Há condições que exigem cuidado. Verifique os detalhes.',
  nao_recomendado: 'Condições desfavoráveis ou de risco hoje.',
};

const TITLES = {
  favoravel: 'Favorável para pesca',
  atencao: 'Atenção ao sair ao mar',
  nao_recomendado: 'Saída não recomendada',
};

// Indicador geral do dia: o elemento mais importante da tela inicial.
// A cor nunca aparece sozinha - sempre com texto explicito.
export default function ConditionIndicatorCard({ status, message }) {
  const { fg, bg, label } = statusColor(status);
  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: fg }]}>
      <View style={[styles.dot, { backgroundColor: fg }]} />
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: fg }]}>{TITLES[status] || label}</Text>
        <Text style={styles.message}>{message || MESSAGES[status]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 4 },
  textWrap: { flex: 1 },
  title: { ...typography.h3, marginBottom: 2 },
  message: { ...typography.body, color: colors.textPrimary },
});
