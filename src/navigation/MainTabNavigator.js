import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import ConditionsDetailScreen from '../screens/ConditionsDetailScreen';
import SpeciesListScreen from '../screens/SpeciesListScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Início: '🏠',
  Condições: '🌤️',
  Espécies: '🐟',
  Calendário: '📅',
  Mais: '⋯',
};

// Barra inferior com cinco opcoes, conforme guia de navegacao (secao 2.1).
// Alertas nao ocupam opcao fixa: aparecem na tela inicial e no sino do cabecalho.
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { height: 64, paddingBottom: 10, paddingTop: 6 },
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>{ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Condições" component={ConditionsDetailScreen} />
      <Tab.Screen name="Espécies" component={SpeciesListScreen} />
      <Tab.Screen name="Calendário" component={CalendarScreen} />
      <Tab.Screen name="Mais" component={MoreScreen} />
    </Tab.Navigator>
  );
}
