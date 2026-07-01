import React, { useMemo } from 'react';
import { SectionList, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { typography, spacing } from '../theme/typography';
import AlertCard from '../components/AlertCard';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

const GROUP_LABEL = { ativo: 'Ativos', proximo: 'Próximos', anterior: 'Anteriores' };

// Tela 14 - Central de alertas. Reune clima, seguranca maritima e defeso.
export default function AlertsScreen({ navigation }) {
  const { conditions } = useApp();
  const alerts = conditions?.alerts || [];

  const sections = useMemo(() => {
    const groups = { ativo: [], proximo: [], anterior: [] };
    alerts.forEach((a) => groups[a.group || 'proximo']?.push(a));
    return Object.entries(groups)
      .filter(([, items]) => items.length > 0)
      .map(([key, items]) => ({ title: GROUP_LABEL[key], data: items }));
  }, [alerts]);

  if (alerts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState icon="✅" title="Nenhum alerta importante para esta região." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SectionList
        contentContainerStyle={styles.list}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={{ marginBottom: spacing.sm }}>
            <AlertCard alert={item} onPress={() => navigation.navigate('AlertDetail', { alertId: item.id })} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.sm },
});
