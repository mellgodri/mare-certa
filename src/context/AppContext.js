import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { storage } from '../services/storage';
import { fetchConditions } from '../services/weatherService';

// Estado global do app: localizacao ativa, dados de condicoes, conectividade,
// favoritos e configuracoes. Mantido simples (Context + hooks) por ser um MVP
// sem necessidade de Redux/Zustand.

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocationState] = useState(null);
  const [conditions, setConditions] = useState(null);
  const [conditionsLoading, setConditionsLoading] = useState(false);
  const [conditionsError, setConditionsError] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [favoriteSpecies, setFavoriteSpecies] = useState([]);
  const [settings, setSettingsState] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const [savedLocation, favLocations, favSpecies, savedSettings] = await Promise.all([
        storage.getActiveLocation(),
        storage.getFavoriteLocations(),
        storage.getFavoriteSpecies(),
        storage.getSettings(),
      ]);
      setFavoriteLocations(favLocations);
      setFavoriteSpecies(favSpecies);
      setSettingsState(savedSettings);
      if (savedLocation) {
        setLocationState(savedLocation);
      } else {
        const cached = await storage.getLastConditionsCache();
        if (cached) setConditions(cached);
      }
    })();
  }, []);

  const loadConditions = useCallback(
    async (loc) => {
      const target = loc || location;
      if (!target) return;
      setConditionsLoading(true);
      setConditionsError(null);
      try {
        if (!isOnline) {
          const cached = await storage.getLastConditionsCache();
          if (cached) {
            setConditions(cached);
          } else {
            setConditionsError('OFFLINE_NO_CACHE');
          }
          return;
        }
        const data = await fetchConditions(target);
        setConditions(data);
        await storage.setLastConditionsCache(data);
      } catch (e) {
        setConditionsError(e.message || 'UNKNOWN_ERROR');
        const cached = await storage.getLastConditionsCache();
        if (cached) setConditions(cached);
      } finally {
        setConditionsLoading(false);
      }
    },
    [location, isOnline]
  );

  const setLocation = useCallback(async (loc) => {
    setLocationState(loc);
    await storage.setActiveLocation(loc);
    await storage.addRecentLocation(loc);
    await loadConditions(loc);
  }, [loadConditions]);

  useEffect(() => {
    if (location) loadConditions(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.id]);

  const toggleFavoriteLocation = useCallback(async (loc) => {
    const updated = await storage.toggleFavoriteLocation(loc);
    setFavoriteLocations(updated);
  }, []);

  const toggleFavoriteSpecies = useCallback(async (speciesId) => {
    const updated = await storage.toggleFavoriteSpecies(speciesId);
    setFavoriteSpecies(updated);
  }, []);

  const updateSettings = useCallback(async (partial) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      storage.setSettings(next);
      return next;
    });
  }, []);

  const value = {
    isOnline,
    location,
    setLocation,
    conditions,
    conditionsLoading,
    conditionsError,
    loadConditions,
    favoriteLocations,
    toggleFavoriteLocation,
    favoriteSpecies,
    toggleFavoriteSpecies,
    settings,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de um AppProvider');
  return ctx;
}
