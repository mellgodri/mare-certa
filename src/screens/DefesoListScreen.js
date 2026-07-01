import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import { getDefesoList } from '../services/mockData';

function daysRemaining(endStr) {
  const [day, month] = endStr.split('/').map(Number);
  const now = new Date();
  let end = new Date(now.getFullYear(), month - 1, day);
  if (end < now) end = new Date(now.getFullYear() + 1, month - 1, day);
  return Math.max(0, Math.ceil((end - now) / 86400000));
}

// Tela 19 - Lista de periodos de defeso.
export default function DefesoListScreen() {
  const navigation = useNavigation();
  const data = getDefesoList();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('SpeciesDetail', { speciesId: item.id })}>
            <Text style={styles.name}>{item.nomePopular}</Text>
            <Text style={styles.period}>Defeso de {item.inicio} a {item.fim}</Text>
            <Text style={styles.region}>{item.regiao}</Text>
            <View style={styles.row}>
              <Text style={styles.situacao}>{item.situacao}</Text>
              <Text style={styles.daysLeft}>{daysRemaining(item.fim)} dias restantes</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: { ...typography.bodyBold, color: colors.textPrimary },
  period: { ...typography.small, color: colors.textSecondary, marginTop: 2 },
  region: { ...typography.small, color: colors.textSecondary },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  situacao: { ...typography.smallBold, color: colors.naoRecomendado, flexShrink: 1 },
  daysLeft: { ...typography.smallBold, color: colors.textPrimary },
});
