import * as Location from 'expo-location';
import { CITIES } from './mockData';

// Encapsula toda a logica de geolocalizacao (GPS) e busca textual de cidades.
// O app nunca deve travar o usuario por causa de permissao negada: sempre
// existe o caminho de selecao manual (ver LocationSearchScreen).

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentDeviceLocation() {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('PERMISSION_DENIED');
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const nearest = findNearestCity(position.coords.latitude, position.coords.longitude);
  return nearest;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestCity(lat, lon) {
  let nearest = CITIES[0];
  let minDist = Infinity;
  CITIES.forEach((city) => {
    const dist = haversineDistance(lat, lon, city.lat, city.lon);
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  });
  return nearest;
}

export function searchCities(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(normalized) || c.uf.toLowerCase().includes(normalized)
  );
}
