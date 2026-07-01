import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';
import ForecastDayItem from '../components/ForecastDayItem';
import ErrorState from '../components/ErrorState';
import { useApp } from '../context/AppContext';

// Tela 9 - Previsao dos proximos dias (5 a 7 dias).
export default function ForecastScreen({ navigation }) {
  const { conditions, loadConditions } = useApp();

  if (!conditions) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState onRetry={() => loadConditions()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.list}
        data={conditions.forecast}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={<Text style={styles.helper}>Toque em um dia para ver o detalhamento por período.</Text>}
        renderItem={({ item }) => (
          <ForecastDayItem day={item} onPress={() => navigation.navigate('DayDetail', { date: item.date })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  helper: { ...typography.small, color: colors.textSecondary, marginBottom: spacing.md },
});
