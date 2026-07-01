import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import Header from '../components/Header';
import ConditionIndicatorCard from '../components/ConditionIndicatorCard';
import ConditionCard from '../components/ConditionCard';
import AlertCard from '../components/AlertCard';
import ForecastDayItem from '../components/ForecastDayItem';
import SkeletonCard from '../components/SkeletonCard';
import OfflineBanner from '../components/OfflineBanner';
import ErrorState from '../components/ErrorState';
import PrimaryButton from '../components/PrimaryButton';
import { useApp } from '../context/AppContext';

// Tela 7 - Inicio. A tela mais importante do aplicativo.
// Suporta as 3 variacoes (Favoravel / Atencao / Nao recomendado) automaticamente,
// de acordo com os dados retornados pelo weatherService.
export default function HomeScreen() {
  const navigation = useNavigation();
  const { location, conditions, conditionsLoading, conditionsError, loadConditions, isOnline } = useApp();

  if (!location) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState
          message="Nenhuma localização selecionada ainda."
          onRetry={() => navigation.navigate('LocationSearch')}
        />
      </SafeAreaView>
    );
  }

  const showSkeleton = conditionsLoading && !conditions;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Apoio à Pesca"
        locationLabel={`${location.name}, ${location.uf}`}
        onPressLocation={() => navigation.navigate('LocationSearch')}
        onPressRefresh={() => loadConditions()}
        alertCount={conditions?.alerts?.filter((a) => a.group === 'ativo').length || 0}
      />

      {!isOnline && <OfflineBanner />}

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={conditionsLoading && !!conditions} onRefresh={() => loadConditions()} />}
      >
        {showSkeleton && (
          <View style={{ gap: spacing.md }}>
            <SkeletonCard height={90} />
            <SkeletonCard height={60} />
            <View style={styles.cardsGrid}>
              <SkeletonCard height={100} style={{ flexBasis: '48%' }} />
              <SkeletonCard height={100} style={{ flexBasis: '48%' }} />
              <SkeletonCard height={100} style={{ flexBasis: '48%' }} />
              <SkeletonCard height={100} style={{ flexBasis: '48%' }} />
            </View>
          </View>
        )}

        {!showSkeleton && conditionsError && !conditions && (
          <ErrorState onRetry={() => loadConditions()} />
        )}

        {conditions && (
          <>
            <ConditionIndicatorCard status={conditions.today.status} />

            <View style={styles.bestTime}>
              <Text style={styles.bestTimeLabel}>Melhor período hoje</Text>
              <Text style={styles.bestTimeValue}>
                Das {conditions.today.bestWindowStart} às {conditions.today.bestWindowEnd}
              </Text>
            </View>

            <View style={styles.cardsGrid}>
              <ConditionCard
                icon="🌤️"
                label="Tempo"
                value={`${conditions.today.tempMax}° / ${conditions.today.tempMin}°`}
                helper={conditions.today.sky}
                onPress={() => navigation.navigate('Condições')}
              />
              <ConditionCard
                icon="💨"
                label="Vento"
                value={`${conditions.today.windKmh} km/h`}
                helper={conditions.today.windDirection}
                onPress={() => navigation.navigate('Wind')}
              />
              <ConditionCard
                icon="🌊"
                label="Mar"
                value={`${conditions.today.waveM} m`}
                helper="Altura das ondas"
                onPress={() => navigation.navigate('Sea')}
              />
              <ConditionCard
                icon="🌙"
                label="Maré"
                value={conditions.tides[0]?.time}
                helper={conditions.tides[0]?.type === 'alta' ? 'Próxima maré alta' : 'Próxima maré baixa'}
                onPress={() => navigation.navigate('Tide')}
              />
            </View>

            <Text style={styles.sectionTitle}>Alertas ativos</Text>
            {conditions.alerts.length === 0 ? (
              <Text style={styles.noAlert}>Nenhum alerta importante para esta região.</Text>
            ) : (
              <View style={{ gap: spacing.sm }}>
                {conditions.alerts.slice(0, 2).map((alert) => (
                  <AlertCard key={alert.id} alert={alert} onPress={() => navigation.navigate('AlertDetail', { alertId: alert.id })} />
                ))}
              </View>
            )}

            <Text style={styles.sectionTitle}>Previsão resumida</Text>
            <View style={{ marginBottom: spacing.md }}>
              {conditions.forecast.slice(0, 3).map((day) => (
                <ForecastDayItem key={day.date} day={day} onPress={() => navigation.navigate('DayDetail', { date: day.date })} />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Acessos rápidos</Text>
            <View style={styles.quickGrid}>
              <PrimaryButton title="Consultar espécies" onPress={() => navigation.navigate('Espécies')} />
              <PrimaryButton title="Ver calendário" onPress={() => navigation.navigate('Calendário')} />
              <PrimaryButton title="Alterar localização" onPress={() => navigation.navigate('LocationSearch')} />
              <PrimaryButton title="Ver previsão completa" onPress={() => navigation.navigate('Forecast')} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, gap: spacing.md },
  bestTime: {
    backgroundColor: colors.infoBg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  bestTimeLabel: { ...typography.small, color: colors.info },
  bestTimeValue: { ...typography.h3, color: colors.info, marginTop: 2 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'space-between' },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.sm },
  noAlert: { ...typography.body, color: colors.textSecondary },
  quickGrid: { gap: spacing.sm, marginBottom: spacing.lg },
});
