import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/typography';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FilterChip from '../components/FilterChip';
import SpeciesCard from '../components/SpeciesCard';
import EmptyState from '../components/EmptyState';
import { SPECIES } from '../services/mockData';
import { useApp } from '../context/AppContext';

const FILTERS = [
  { id: 'todas', label: 'Todas' },
  { id: 'permitida', label: 'Pesca permitida' },
  { id: 'defeso', label: 'Em período de defeso' },
  { id: 'Água doce', label: 'Água doce' },
  { id: 'Água salgada', label: 'Água salgada' },
];

// Tela 16 - Lista de especies.
export default function SpeciesListScreen() {
  const navigation = useNavigation();
  const { location, favoriteSpecies } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('todas');

  const filtered = useMemo(() => {
    return SPECIES.filter((s) => {
      const matchesQuery = s.nomePopular.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'todas' ||
        s.status === filter ||
        s.ambiente === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Espécies" locationLabel={location ? `${location.name}, ${location.uf}` : null} />
      <View style={styles.searchWrap}>
        <SearchInput value={query} onChangeText={setQuery} placeholder="Pesquisar espécie" />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <FilterChip label={item.label} active={filter === item.id} onPress={() => setFilter(item.id)} />
        )}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <EmptyState
            title="Nenhuma espécie foi encontrada."
            suggestions={['Verificar a escrita', 'Pesquisar pelo nome popular', 'Remover filtros']}
          />
        }
        renderItem={({ item }) => (
          <SpeciesCard
            species={item}
            isFavorite={favoriteSpecies.includes(item.id)}
            onPress={() => navigation.navigate('SpeciesDetail', { speciesId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchWrap: { padding: spacing.md, paddingBottom: spacing.sm },
  filterRow: { paddingHorizontal: spacing.md, gap: spacing.sm, paddingBottom: spacing.sm },
  list: { padding: spacing.md, paddingTop: spacing.sm },
});
