import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/typography';
import SpeciesCard from '../components/SpeciesCard';
import EmptyState from '../components/EmptyState';
import { SPECIES } from '../services/mockData';
import { useApp } from '../context/AppContext';

// Tela 21 - Especies favoritas.
export default function FavoritesSpeciesScreen() {
  const navigation = useNavigation();
  const { favoriteSpecies } = useApp();
  const data = SPECIES.filter((s) => favoriteSpecies.includes(s.id));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={<EmptyState icon="🐟" title="Você ainda não salvou espécies favoritas." />}
        renderItem={({ item }) => (
          <SpeciesCard species={item} isFavorite onPress={() => navigation.navigate('SpeciesDetail', { speciesId: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
});
