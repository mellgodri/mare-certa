import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';

// Cabecalho reutilizado nas telas principais: localizacao sempre visivel,
// sino de notificacoes e botao de atualizar.
export default function Header({ title, locationLabel, onPressLocation, onPressRefresh, alertCount = 0 }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          {onPressRefresh && (
            <Pressable onPress={onPressRefresh} accessibilityLabel="Atualizar dados" style={styles.iconBtn}>
              <Text style={styles.icon}>⟳</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.navigate('Alerts')}
            accessibilityLabel="Ver alertas"
            style={styles.iconBtn}
          >
            <Text style={styles.icon}>🔔</Text>
            {alertCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{alertCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      {locationLabel && (
        <Pressable onPress={onPressLocation} style={styles.locationRow} accessibilityLabel="Alterar localização">
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>{locationLabel}</Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...typography.h2, color: colors.textInverse },
  actions: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 18 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.naoRecomendado,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: colors.textInverse, fontSize: 10, fontWeight: '700' },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  locationIcon: { fontSize: 14 },
  locationText: { ...typography.smallBold, color: colors.textInverse, flexShrink: 1 },
  chevron: { color: colors.textInverse, fontSize: 16 },
});
