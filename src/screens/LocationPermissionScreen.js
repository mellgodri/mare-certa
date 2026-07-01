import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { requestLocationPermission, getCurrentDeviceLocation } from '../services/locationService';
import { useApp } from '../context/AppContext';

// Tela 5 - Solicitacao de localizacao.
// O usuario nunca deve ficar impedido de usar o app por negar a permissao.
export default function LocationPermissionScreen({ navigation }) {
  const { setLocation } = useApp();
  const [loading, setLoading] = useState(false);

  const handleAllow = async () => {
    setLoading(true);
    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        setLoading(false);
        Alert.alert(
          'Permissão negada',
          'A localização automática está desativada. Escolha uma cidade manualmente ou permita o acesso nas configurações do celular.'
        );
        navigation.replace('LocationSearch', { fromOnboarding: true });
        return;
      }
      const city = await getCurrentDeviceLocation();
      await setLocation(city);
      navigation.replace('Main');
    } catch (e) {
      setLoading(false);
      navigation.replace('LocationSearch', { fromOnboarding: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Permitir acesso à localização?</Text>
        <Text style={styles.text}>
          Utilizamos sua localização para apresentar as condições do tempo, vento, mar e maré da sua região.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton title="Permitir localização" onPress={handleAllow} loading={loading} />
        <SecondaryButton
          title="Escolher local manualmente"
          onPress={() => navigation.replace('LocationSearch', { fromOnboarding: true })}
        />
        <SecondaryButton title="Agora não" onPress={() => navigation.replace('LocationSearch', { fromOnboarding: true })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 56, marginBottom: spacing.lg },
  title: { ...typography.h2, color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.md },
  text: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  footer: { gap: spacing.sm },
});
