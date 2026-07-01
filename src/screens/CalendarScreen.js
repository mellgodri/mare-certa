import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import Header from '../components/Header';
import SecondaryButton from '../components/SecondaryButton';
import { SPECIES } from '../services/mockData';
import { useApp } from '../context/AppContext';

const WEEKDAY_LETTERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function isDateInDefeso(date, species) {
  // Simplificacao para o prototipo: usa o dia do mes para alternar estados
  // de forma visivel, simulando regras reais de defeso por especie.
  return species.some((s) => s.status === 'defeso' && date.getDate() % 5 === 0);
}

// Tela 18 - Calendario de pesca e defeso.
export default function CalendarScreen() {
  const navigation = useNavigation();
  const { location } = useApp();
  const [viewMode, setViewMode] = useState('mensal');
  const [selectedDay, setSelectedDay] = useState(new Date());

  const monthMatrix = useMemo(() => buildMonthMatrix(selectedDay), [selectedDay]);

  const speciesPermitidas = SPECIES.filter((s) => s.status === 'permitida');
  const speciesDefeso = SPECIES.filter((s) => s.status === 'defeso');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Calendário" locationLabel={location ? `${location.name}, ${location.uf}` : null} />

      <View style={styles.toggleRow}>
        <ToggleButton label="Calendário mensal" active={viewMode === 'mensal'} onPress={() => setViewMode('mensal')} />
        <ToggleButton label="Lista por espécie" active={viewMode === 'lista'} onPress={() => setViewMode('lista')} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {viewMode === 'mensal' ? (
          <>
            <Text style={styles.monthTitle}>
              {selectedDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </Text>
            <View style={styles.weekHeader}>
              {WEEKDAY_LETTERS.map((d, i) => (
                <Text key={i} style={styles.weekHeaderText}>{d}</Text>
              ))}
            </View>
            {monthMatrix.map((week, wi) => (
              <View key={wi} style={styles.weekRow}>
                {week.map((day, di) => {
                  if (!day) return <View key={di} style={styles.dayCell} />;
                  const defeso = isDateInDefeso(day, SPECIES);
                  const selected = day.toDateString() === selectedDay.toDateString();
                  return (
                    <Pressable key={di} style={[styles.dayCell, selected && styles.dayCellSelected]} onPress={() => setSelectedDay(day)}>
                      <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day.getDate()}</Text>
                      <View style={[styles.dot, { backgroundColor: defeso ? colors.naoRecomendado : colors.favoravel }]} />
                    </Pressable>
                  );
                })}
              </View>
            ))}

            <Text style={styles.sectionTitle}>Espécies com pesca permitida</Text>
            {speciesPermitidas.map((s) => (
              <Pressable key={s.id} style={styles.speciesRow} onPress={() => navigation.navigate('SpeciesDetail', { speciesId: s.id })}>
                <Text style={styles.speciesRowText}>{s.nomePopular}</Text>
              </Pressable>
            ))}

            <Text style={styles.sectionTitle}>Espécies em defeso</Text>
            {speciesDefeso.map((s) => (
              <Pressable key={s.id} style={styles.speciesRow} onPress={() => navigation.navigate('SpeciesDetail', { speciesId: s.id })}>
                <Text style={styles.speciesRowText}>{s.nomePopular}</Text>
              </Pressable>
            ))}

            <View style={{ marginTop: spacing.md }}>
              <SecondaryButton title="Ver lista completa de defeso" onPress={() => navigation.navigate('DefesoList')} />
            </View>
          </>
        ) : (
          <View style={{ gap: spacing.sm }}>
            {SPECIES.map((s) => (
              <Pressable key={s.id} style={styles.listCard} onPress={() => navigation.navigate('SpeciesDetail', { speciesId: s.id })}>
                <Text style={styles.listCardName}>{s.nomePopular}</Text>
                <Text style={styles.listCardPeriod}>Defeso: {s.periodoDefeso}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ToggleButton({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.toggleBtn, active && styles.toggleBtnActive]}>
      <Text style={[styles.toggleLabel, active && styles.toggleLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function buildMonthMatrix(reference) {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  toggleRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  toggleBtn: { flex: 1, padding: spacing.sm, borderRadius: radius.md, backgroundColor: colors.surfaceAlt, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  toggleBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleLabel: { ...typography.smallBold, color: colors.textSecondary },
  toggleLabelActive: { color: colors.textInverse },
  scroll: { padding: spacing.md, paddingTop: 0 },
  monthTitle: { ...typography.h3, color: colors.textPrimary, textTransform: 'capitalize', marginBottom: spacing.sm },
  weekHeader: { flexDirection: 'row', marginBottom: spacing.xs },
  weekHeaderText: { flex: 1, textAlign: 'center', ...typography.caption, color: colors.textSecondary },
  weekRow: { flexDirection: 'row' },
  dayCell: { flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' },
  dayCellSelected: { backgroundColor: colors.primaryLight, borderRadius: radius.sm },
  dayText: { ...typography.small, color: colors.textPrimary },
  dayTextSelected: { color: colors.textInverse, fontWeight: '700' },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 2 },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.sm },
  speciesRow: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  speciesRowText: { ...typography.body, color: colors.textPrimary },
  listCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  listCardName: { ...typography.bodyBold, color: colors.textPrimary },
  listCardPeriod: { ...typography.small, color: colors.textSecondary, marginTop: 2 },
});
