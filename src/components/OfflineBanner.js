import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';

export default function OfflineBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Você está offline. Exibindo os últimos dados salvos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.atencaoBg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.atencao,
  },
  text: { ...typography.smallBold, color: colors.atencao, textAlign: 'center' },
});
