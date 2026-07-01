import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { storage } from '../services/storage';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import LocationSearchScreen from '../screens/LocationSearchScreen';
import MainTabNavigator from './MainTabNavigator';

import ForecastScreen from '../screens/ForecastScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import WindScreen from '../screens/WindScreen';
import SeaScreen from '../screens/SeaScreen';
import TideScreen from '../screens/TideScreen';
import AlertsScreen from '../screens/AlertsScreen';
import AlertDetailScreen from '../screens/AlertDetailScreen';
import SpeciesDetailScreen from '../screens/SpeciesDetailScreen';
import DefesoListScreen from '../screens/DefesoListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesLocationsScreen from '../screens/FavoritesLocationsScreen';
import FavoritesSpeciesScreen from '../screens/FavoritesSpeciesScreen';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.textInverse,
  headerTitleStyle: { fontWeight: '700' },
  headerBackTitleVisible: false,
};

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    (async () => {
      const onboardingDone = await storage.isOnboardingDone();
      const activeLocation = await storage.getActiveLocation();
      if (!onboardingDone) {
        setInitialRoute('Onboarding');
      } else if (!activeLocation) {
        setInitialRoute('LocationPermission');
      } else {
        setInitialRoute('Main');
      }
    })();
  }, []);

  // A propria Splash cuida da decisao final assim que os dados carregarem,
  // entao sempre comecamos por ela para a animacao/identidade do app.
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {(props) => <SplashScreen {...props} initialRoute={initialRoute} />}
        </Stack.Screen>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
        <Stack.Screen name="LocationSearch" component={LocationSearchScreen} options={{ ...headerOptions, headerShown: true, title: 'Escolher localização' }} />
        <Stack.Screen name="Main" component={MainTabNavigator} />

        <Stack.Screen name="Forecast" component={ForecastScreen} options={{ ...headerOptions, title: 'Previsão dos próximos dias' }} />
        <Stack.Screen name="DayDetail" component={DayDetailScreen} options={{ ...headerOptions, title: 'Detalhamento do dia' }} />
        <Stack.Screen name="Wind" component={WindScreen} options={{ ...headerOptions, title: 'Vento' }} />
        <Stack.Screen name="Sea" component={SeaScreen} options={{ ...headerOptions, title: 'Condições do mar' }} />
        <Stack.Screen name="Tide" component={TideScreen} options={{ ...headerOptions, title: 'Maré' }} />
        <Stack.Screen name="Alerts" component={AlertsScreen} options={{ ...headerOptions, title: 'Central de alertas' }} />
        <Stack.Screen name="AlertDetail" component={AlertDetailScreen} options={{ ...headerOptions, title: 'Detalhe do alerta' }} />
        <Stack.Screen name="SpeciesDetail" component={SpeciesDetailScreen} options={{ ...headerOptions, title: 'Detalhe da espécie' }} />
        <Stack.Screen name="DefesoList" component={DefesoListScreen} options={{ ...headerOptions, title: 'Períodos de defeso' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ ...headerOptions, title: 'Configurações' }} />
        <Stack.Screen name="FavoriteLocations" component={FavoritesLocationsScreen} options={{ ...headerOptions, title: 'Locais favoritos' }} />
        <Stack.Screen name="FavoriteSpecies" component={FavoritesSpeciesScreen} options={{ ...headerOptions, title: 'Espécies favoritas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
