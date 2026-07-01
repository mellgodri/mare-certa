import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';

// Tela 1 - Splash Screen.
// Mostra a identidade do app enquanto os dados iniciais (onboarding feito?
// localizacao salva?) sao carregados pelo RootNavigator, e entao redireciona.
export default function SplashScreen({ navigation, initialRoute }) {
  useEffect(() => {
    if (!initialRoute) return;
    const timer = setTimeout(() => {
      navigation.replace(initialRoute);
    }, 900);
    return () => clearTimeout(timer);
  }, [initialRoute, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.wave}>🌊</Text>
      <Text style={styles.logo}>Apoio à Pesca</Text>
      <Text style={styles.tagline}>Clima, vento, maré e mar em um só lugar</Text>
      <ActivityIndicator color={colors.textInverse} style={{ marginTop: spacing.xl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  wave: { fontSize: 56, marginBottom: spacing.md },
  logo: { ...typography.h1, color: colors.textInverse, textAlign: 'center' },
  tagline: { ...typography.body, color: colors.textInverse, opacity: 0.85, textAlign: 'center', marginTop: spacing.sm },
});
