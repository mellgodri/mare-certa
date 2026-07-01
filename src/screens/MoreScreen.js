import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';

const ITEMS = [
  { id: 'favLocations', icon: '📍', label: 'Locais favoritos', route: 'FavoriteLocations' },
  { id: 'favSpecies', icon: '🐟', label: 'Espécies favoritas', route: 'FavoriteSpecies' },
  { id: 'alerts', icon: '🔔', label: 'Alertas e notificações', route: 'Alerts' },
  { id: 'offline', icon: '📦', label: 'Dados salvos offline', route: null },
  { id: 'tutorial', icon: '🎓', label: 'Tutorial', route: 'Onboarding' },
  { id: 'settings', icon: '⚙️', label: 'Configurações', route: 'Settings' },
  { id: 'about', icon: 'ℹ️', label: 'Sobre o aplicativo', route: null },
  { id: 'sources', icon: '📚', label: 'Fontes das informações', route: null },
  { id: 'privacy', icon: '🔒', label: 'Política de privacidade', route: null },
];

// Tela 22 - Menu adicional. Sem login no MVP: dados ficam locais no dispositivo.
export default function MoreScreen() {
  const navigation = useNavigation();
  const { location } = useApp();

  const handlePress = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Mais" locationLabel={location ? `${location.name}, ${location.uf}` : null} />
      <ScrollView contentContainerStyle={styles.list}>
        {ITEMS.map((item) => (
          <Pressable key={item.id} style={styles.row} onPress={() => handlePress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
        <Text style={styles.footerNote}>Não é necessário criar login. Seus dados ficam salvos apenas neste dispositivo.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  icon: { fontSize: 20 },
  label: { ...typography.body, color: colors.textPrimary, flex: 1 },
  chevron: { ...typography.h3, color: colors.textSecondary },
  footerNote: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
});
