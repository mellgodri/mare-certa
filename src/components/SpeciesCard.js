import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

// A situacao precisa ser informada por TEXTO, nao apenas por cor.
export default function SpeciesCard({ species, onPress, isFavorite }) {
  const permitted = species.status === 'permitida';
  const fg = permitted ? colors.favoravel : colors.naoRecomendado;
  const bg = permitted ? colors.favoravelBg : colors.naoRecomendadoBg;
  const statusLabel = permitted ? 'Pesca permitida' : 'Em período de defeso';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.thumb}>
        <Text style={styles.thumbIcon}>🐟</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.rowTop}>
          <Text style={styles.name}>{species.nomePopular}</Text>
          {isFavorite ? <Text style={styles.fav}>★</Text> : null}
        </View>
        <View style={[styles.statusPill, { backgroundColor: bg }]}>
          <Text style={[styles.statusText, { color: fg }]}>{statusLabel}</Text>
        </View>
        <Text style={styles.link}>Ver informações ›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing.sm,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbIcon: { fontSize: 26 },
  content: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { ...typography.bodyBold, color: colors.textPrimary },
  fav: { color: colors.atencao, fontSize: 16 },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: 4,
  },
  statusText: { ...typography.caption, fontWeight: '700' },
  link: { ...typography.small, color: colors.primary, marginTop: 4 },
});
