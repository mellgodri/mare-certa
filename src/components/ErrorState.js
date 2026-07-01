import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function ErrorState({ message = 'Não foi possível atualizar os dados.', onRetry, onSeeLast }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        {onRetry && <PrimaryButton title="Tentar novamente" onPress={onRetry} />}
        {onSeeLast && <SecondaryButton title="Ver última consulta" onPress={onSeeLast} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: spacing.xl, gap: spacing.md },
  icon: { fontSize: 36 },
  message: { ...typography.bodyBold, color: colors.textPrimary, textAlign: 'center' },
  actions: { width: '100%', gap: spacing.sm },
});
