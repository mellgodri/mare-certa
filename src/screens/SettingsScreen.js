import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Switch, Pressable, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import { useApp } from '../context/AppContext';

function SettingRow({ label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: colors.primary }} />
    </View>
  );
}

function OptionRow({ label, value, options, onSelect }) {
  return (
    <View style={styles.optionRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.optionPills}>
        {options.map((opt) => (
          <Pressable key={opt} onPress={() => onSelect(opt)} style={[styles.pill, value === opt && styles.pillActive]}>
            <Text style={[styles.pillText, value === opt && styles.pillTextActive]}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// Tela 23 - Configuracoes.
export default function SettingsScreen() {
  const { settings, updateSettings } = useApp();
  const [locationStatus, setLocationStatus] = useState('unknown');
  const [notifStatus, setNotifStatus] = useState('unknown');

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then((r) => setLocationStatus(r.status));
    Notifications.getPermissionsAsync().then((r) => setNotifStatus(r.status));
  }, []);

  if (!settings) return null;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        <SettingRow
          label="Ativar notificações"
          value={settings.notificationsEnabled}
          onValueChange={(v) => updateSettings({ notificationsEnabled: v })}
        />
        <SettingRow label="Alertas de clima" value={settings.alertsClima} onValueChange={(v) => updateSettings({ alertsClima: v })} />
        <SettingRow label="Alertas de vento" value={settings.alertsVento} onValueChange={(v) => updateSettings({ alertsVento: v })} />
        <SettingRow label="Alertas marítimos" value={settings.alertsMaritimos} onValueChange={(v) => updateSettings({ alertsMaritimos: v })} />
        <SettingRow label="Alertas de defeso" value={settings.alertsDefeso} onValueChange={(v) => updateSettings({ alertsDefeso: v })} />

        <Text style={styles.sectionTitle}>Unidades e exibição</Text>
        <OptionRow label="Unidade de velocidade" value={settings.speedUnit} options={['km/h', 'nós']} onSelect={(v) => updateSettings({ speedUnit: v })} />
        <OptionRow label="Unidade de temperatura" value={settings.tempUnit} options={['C', 'F']} onSelect={(v) => updateSettings({ tempUnit: v })} />
        <OptionRow label="Tamanho do texto" value={settings.textSize} options={['normal', 'grande']} onSelect={(v) => updateSettings({ textSize: v })} />
        <SettingRow label="Alto contraste" value={settings.highContrast} onValueChange={(v) => updateSettings({ highContrast: v })} />
        <SettingRow label="Atualização automática" value={settings.autoUpdate} onValueChange={(v) => updateSettings({ autoUpdate: v })} />

        <Text style={styles.sectionTitle}>Permissões</Text>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionLabel}>Localização</Text>
          <Text style={[styles.permissionValue, locationStatus === 'granted' ? styles.granted : styles.denied]}>
            {locationStatus === 'granted' ? 'Permitida' : 'Negada'}
          </Text>
        </View>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionLabel}>Notificações</Text>
          <Text style={[styles.permissionValue, notifStatus === 'granted' ? styles.granted : styles.denied]}>
            {notifStatus === 'granted' ? 'Permitidas' : 'Negadas'}
          </Text>
        </View>
        {(locationStatus !== 'granted' || notifStatus !== 'granted') && (
          <Pressable style={styles.settingsLink} onPress={() => Linking.openSettings()}>
            <Text style={styles.settingsLinkText}>Alterar nas configurações do celular</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { ...typography.body, color: colors.textPrimary, flex: 1 },
  optionRow: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionPills: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  pill: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
  pillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pillText: { ...typography.smallBold, color: colors.textSecondary },
  pillTextActive: { color: colors.textInverse },
  permissionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  permissionLabel: { ...typography.body, color: colors.textPrimary },
  permissionValue: { ...typography.bodyBold },
  granted: { color: colors.favoravel },
  denied: { color: colors.naoRecomendado },
  settingsLink: { marginTop: spacing.sm, marginBottom: spacing.xl },
  settingsLinkText: { ...typography.bodyBold, color: colors.primary, textAlign: 'center' },
});
