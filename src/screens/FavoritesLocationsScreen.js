import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, statusColor } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import EmptyState from '../components/EmptyState';
import SecondaryButton from '../components/SecondaryButton';
import { useApp } from '../context/AppContext';

// Tela 20 - Locais favoritos.
export default function FavoritesLocationsScreen() {
  const navigation = useNavigation();
  const { favoriteLocations, toggleFavoriteLocation, setLocation, location } = useApp();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.list}
        data={favoriteLocations}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <EmptyState icon="📍" title="Você ainda não salvou locais favoritos." />
        }
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <SecondaryButton title="Adicionar localização" onPress={() => navigation.navigate('LocationSearch')} />
          </View>
        }
        renderItem={({ item }) => {
          const isActive = location?.id === item.id;
          return (
            <Pressable
              style={[styles.card, isActive && styles.cardActive]}
              onPress={async () => {
                await setLocation(item);
                navigation.navigate('Main', { screen: 'Início' });
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}, {item.uf}</Text>
                {isActive && <Text style={styles.activeTag}>Localização atual</Text>}
              </View>
              <Pressable onPress={() => toggleFavoriteLocation(item)} accessibilityLabel="Remover favorito">
                <Text style={styles.remove}>★</Text>
              </Pressable>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardActive: { borderColor: colors.primary },
  name: { ...typography.bodyBold, color: colors.textPrimary },
  activeTag: { ...typography.caption, color: colors.primary, marginTop: 2 },
  remove: { fontSize: 20, color: colors.atencao, paddingLeft: spacing.sm },
});
