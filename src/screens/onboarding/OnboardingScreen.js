import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { typography, spacing, radius } from '../../theme/typography';
import PrimaryButton from '../../components/PrimaryButton';
import { storage } from '../../services/storage';

// Telas 2, 3 e 4 - Onboarding (maximo 3 telas, conforme guia).
// Implementadas como uma unica tela com passos internos para reaproveitar
// estrutura, navegacao por pontos e botoes "Continuar" / "Pular".
const STEPS = [
  {
    icon: '🎣',
    title: 'Planeje sua pesca com mais segurança',
    text: 'Consulte clima, vento, maré, condições do mar, espécies e períodos de defeso em um único lugar.',
    cta: 'Continuar',
  },
  {
    icon: '🚦',
    title: 'Saiba como estão as condições',
    text: 'Veja rapidamente se o dia está favorável, exige atenção ou não é recomendado para sair ao mar.',
    cta: 'Continuar',
    showIndicators: true,
  },
  {
    icon: '📅',
    title: 'Consulte espécies e períodos de defeso',
    text: 'Pesquise uma espécie e descubra se a pesca está permitida no período atual.',
    cta: 'Começar',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const finish = async () => {
    await storage.setOnboardingDone(true);
    navigation.replace('LocationPermission');
  };

  const handleContinue = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step < STEPS.length - 1 && (
        <Pressable onPress={finish} style={styles.skip} accessibilityLabel="Pular introdução">
          <Text style={styles.skipText}>Pular</Text>
        </Pressable>
      )}

      <View style={styles.content}>
        <Text style={styles.icon}>{current.icon}</Text>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.text}>{current.text}</Text>

        {current.showIndicators && (
          <View style={styles.indicatorRow}>
            <View style={[styles.indicatorPill, { backgroundColor: colors.favoravelBg }]}>
              <Text style={[styles.indicatorText, { color: colors.favoravel }]}>Favorável</Text>
            </View>
            <View style={[styles.indicatorPill, { backgroundColor: colors.atencaoBg }]}>
              <Text style={[styles.indicatorText, { color: colors.atencao }]}>Atenção</Text>
            </View>
            <View style={[styles.indicatorPill, { backgroundColor: colors.naoRecomendadoBg }]}>
              <Text style={[styles.indicatorText, { color: colors.naoRecomendado }]}>Não recomendado</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <PrimaryButton title={current.cta} onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  skip: { alignSelf: 'flex-end' },
  skipText: { ...typography.bodyBold, color: colors.primary },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 64, marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.md },
  text: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  indicatorRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, flexWrap: 'wrap', justifyContent: 'center' },
  indicatorPill: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  indicatorText: { ...typography.smallBold },
  footer: { gap: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 20 },
});
