import AsyncStorage from '@react-native-async-storage/async-storage';

// Centraliza todo o acesso ao armazenamento local.
// Não há login no MVP: tudo fica salvo no dispositivo.

const KEYS = {
  ONBOARDING_DONE: '@fishingapp:onboarding_done',
  LOCATION_PERMISSION_ASKED: '@fishingapp:location_permission_asked',
  ACTIVE_LOCATION: '@fishingapp:active_location',
  RECENT_LOCATIONS: '@fishingapp:recent_locations',
  FAVORITE_LOCATIONS: '@fishingapp:favorite_locations',
  FAVORITE_SPECIES: '@fishingapp:favorite_species',
  SETTINGS: '@fishingapp:settings',
  LAST_CONDITIONS_CACHE: '@fishingapp:last_conditions_cache',
};

async function getJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

async function setJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export const storage = {
  KEYS,
  getJSON,
  setJSON,

  isOnboardingDone: () => getJSON(KEYS.ONBOARDING_DONE, false),
  setOnboardingDone: (value) => setJSON(KEYS.ONBOARDING_DONE, value),

  getActiveLocation: () => getJSON(KEYS.ACTIVE_LOCATION, null),
  setActiveLocation: (location) => setJSON(KEYS.ACTIVE_LOCATION, location),

  getRecentLocations: () => getJSON(KEYS.RECENT_LOCATIONS, []),
  addRecentLocation: async (location) => {
    const list = await getJSON(KEYS.RECENT_LOCATIONS, []);
    const filtered = list.filter((l) => l.id !== location.id);
    const updated = [location, ...filtered].slice(0, 5);
    await setJSON(KEYS.RECENT_LOCATIONS, updated);
    return updated;
  },

  getFavoriteLocations: () => getJSON(KEYS.FAVORITE_LOCATIONS, []),
  toggleFavoriteLocation: async (location) => {
    const list = await getJSON(KEYS.FAVORITE_LOCATIONS, []);
    const exists = list.some((l) => l.id === location.id);
    const updated = exists
      ? list.filter((l) => l.id !== location.id)
      : [...list, location];
    await setJSON(KEYS.FAVORITE_LOCATIONS, updated);
    return updated;
  },

  getFavoriteSpecies: () => getJSON(KEYS.FAVORITE_SPECIES, []),
  toggleFavoriteSpecies: async (speciesId) => {
    const list = await getJSON(KEYS.FAVORITE_SPECIES, []);
    const updated = list.includes(speciesId)
      ? list.filter((id) => id !== speciesId)
      : [...list, speciesId];
    await setJSON(KEYS.FAVORITE_SPECIES, updated);
    return updated;
  },

  getSettings: () =>
    getJSON(KEYS.SETTINGS, {
      notificationsEnabled: true,
      alertsClima: true,
      alertsVento: true,
      alertsMaritimos: true,
      alertsDefeso: true,
      speedUnit: 'km/h',
      tempUnit: 'C',
      textSize: 'normal',
      highContrast: false,
      autoUpdate: true,
    }),
  setSettings: (settings) => setJSON(KEYS.SETTINGS, settings),

  getLastConditionsCache: () => getJSON(KEYS.LAST_CONDITIONS_CACHE, null),
  setLastConditionsCache: (data) =>
    setJSON(KEYS.LAST_CONDITIONS_CACHE, { ...data, savedAt: Date.now() }),
};
