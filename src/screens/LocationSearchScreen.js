import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import SearchInput from '../components/SearchInput';
import PrimaryButton from '../components/PrimaryButton';
import { searchCities, getCurrentDeviceLocation } from '../services/locationService';
import { storage } from '../services/storage';
import { useApp } from '../context/AppContext';

// Tela 6 - Escolher localizacao. Permite consulta por GPS ou selecao manual.
export default function LocationSearchScreen({ navigation, route }) {
  const fromOnboarding = route?.params?.fromOnboarding;
  const { setLocation, favoriteLocations } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const [gpsError, setGpsError] = useState(false);

  useEffect(() => {
    storage.getRecentLocations().then(setRecent);
  }, []);

  useEffect(() => {
    setResults(searchCities(query));
  }, [query]);

  const choose = async (city) => {
    await setLocation(city);
    if (fromOnboarding) {
      navigation.replace('Main');
    } else {
      navigation.goBack();
    }
  };

  const useMyLocation = async () => {
    try {
      const city = await getCurrentDeviceLocation();
      await choose(city);
    } catch (e) {
      setGpsError(true);
    }
  };

  const listData = query ? results : [];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchWrap}>
        <SearchInput value={query} onChangeText={setQuery} placeholder="Pesquisar cidade ou região" />
      </View>

      <PrimaryButton title="Usar minha localização" onPress={useMyLocation} icon={<Text>📍</Text>} />

      {gpsError && (
        <View style={styles.gpsErrorBox}>
          <Text style={styles.gpsErrorText}>
            A localização automática está desativada. Você ainda pode pesquisar uma cidade manualmente.
          </Text>
        </View>
      )}

      {query.length > 0 ? (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          style={{ marginTop: spacing.md }}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma cidade encontrada.</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.row} onPress={() => choose(item)}>
              <Text style={styles.rowText}>{item.name}, {item.uf}</Text>
            </Pressable>
          )}
        />
      ) : (
        <View style={{ marginTop: spacing.lg }}>
          {recent.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recentes</Text>
              {recent.map((item) => (
                <Pressable key={item.id} style={styles.row} onPress={() => choose(item)}>
                  <Text style={styles.rowText}>{item.name}, {item.uf}</Text>
                </Pressable>
              ))}
            </>
          )}
          {favoriteLocations.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Favoritos</Text>
              {favoriteLocations.map((item) => (
                <Pressable key={item.id} style={styles.row} onPress={() => choose(item)}>
                  <Text style={styles.rowText}>★ {item.name}, {item.uf}</Text>
                </Pressable>
              ))}
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md, gap: spacing.md },
  searchWrap: {},
  gpsErrorBox: { backgroundColor: colors.atencaoBg, padding: spacing.md, borderRadius: radius.md },
  gpsErrorText: { ...typography.small, color: colors.atencao },
  sectionTitle: { ...typography.smallBold, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.md },
  row: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  rowText: { ...typography.body, color: colors.textPrimary },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg },
});
