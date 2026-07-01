import React from 'react';
import { View, Text, ScrollView, StyleSheet, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography, spacing, radius } from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ErrorState from '../components/ErrorState';
import { SPECIES } from '../services/mockData';
import { useApp } from '../context/AppContext';

// Tela 17 - Detalhe da especie (cobre tanto "permitida" quanto "defeso").
export default function SpeciesDetailScreen({ route }) {
  const { speciesId } = route.params;
  const navigation = useNavigation();
  const { location, favoriteSpecies, toggleFavoriteSpecies } = useApp();
  const species = SPECIES.find((s) => s.id === speciesId);

  if (!species) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message="Espécie não encontrada." />
      </SafeAreaView>
    );
  }

  const permitted = species.status === 'permitida';
  const isFavorite = favoriteSpecies.includes(species.id);

  const share = () => {
    Share.share({
      message: `${species.nomePopular} (${species.nomeCientifico}): ${
        permitted ? 'pesca permitida atualmente' : 'em período de defeso, pesca proibida'
      }. Fonte: ${species.fonte}.`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageIcon}>🐟</Text>
        </View>

        <Text style={styles.name}>{species.nomePopular}</Text>
        <Text style={styles.scientific}>{species.nomeCientifico}</Text>

        <View style={[styles.statusBanner, { backgroundColor: permitted ? colors.favoravelBg : colors.naoRecomendadoBg }]}>
          <Text style={[styles.statusText, { color: permitted ? colors.favoravel : colors.naoRecomendado }]}>
            {permitted ? 'Pesca permitida atualmente' : 'Pesca proibida — período de defeso'}
          </Text>
        </View>

        <Field label="Tipo de ambiente" value={species.ambiente} />
        <Field label="Período permitido" value={species.periodoPermitido} />
        <Field label="Período de defeso" value={species.periodoDefeso} />
        <Field label="Tamanho mínimo permitido" value={species.tamanhoMinimo} />
        <Field label="Região em que a regra se aplica" value={species.regiao} />
        <Field label="Orientações importantes" value={species.orientacoes} />
        <Field label="Fonte das informações" value={species.fonte} />
        <Field label="Última atualização" value={species.atualizadoEm} />

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            As regras podem variar por região. Esta consulta considera a localização: {location ? `${location.name}, ${location.uf}` : '—'}.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title={isFavorite ? 'Remover dos favoritos' : 'Salvar espécie como favorita'}
            onPress={() => toggleFavoriteSpecies(species.id)}
          />
          <SecondaryButton title="Consultar no calendário" onPress={() => navigation.navigate('Main', { screen: 'Calendário' })} />
          <SecondaryButton title="Compartilhar informação" onPress={share} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  imagePlaceholder: {
    height: 160,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  imageIcon: { fontSize: 56 },
  name: { ...typography.h1, color: colors.textPrimary },
  scientific: { ...typography.body, color: colors.textSecondary, fontStyle: 'italic', marginBottom: spacing.md },
  statusBanner: { borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  statusText: { ...typography.bodyBold },
  field: { marginBottom: spacing.md },
  fieldLabel: { ...typography.small, color: colors.textSecondary },
  fieldValue: { ...typography.body, color: colors.textPrimary, marginTop: 2 },
  noteBox: { backgroundColor: colors.infoBg, borderRadius: radius.md, padding: spacing.md, marginVertical: spacing.md },
  noteText: { ...typography.small, color: colors.info },
  actions: { gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.lg },
});
