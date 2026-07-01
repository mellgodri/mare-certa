import axios from 'axios';

// Este servico concentra toda a busca de condicoes (clima, vento, mar, mare e alertas).
// Hoje ele gera dados simulados de forma deterministica por localizacao, para que o
// prototipo funcione sem chave de API. Para producao, troque `fetchConditions` por uma
// chamada real (ex.: Open-Meteo, StormGlass, Marine Weather API) mantendo o mesmo formato
// de retorno, para nao precisar alterar as telas.

// const API_BASE_URL = 'https://api.exemplo.com';
// const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

function seededRandom(seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function classify({ windKmh, waveM, rainChance }) {
  if (windKmh >= 35 || waveM >= 2.0 || rainChance >= 80) return 'nao_recomendado';
  if (windKmh >= 22 || waveM >= 1.3 || rainChance >= 50) return 'atencao';
  return 'favoravel';
}

function buildDay(rand, dayOffset) {
  const windKmh = Math.round(8 + rand() * 35);
  const waveM = +(0.4 + rand() * 2.0).toFixed(1);
  const rainChance = Math.round(rand() * 100);
  const tempMax = Math.round(22 + rand() * 9);
  const tempMin = tempMax - Math.round(4 + rand() * 4);
  const status = classify({ windKmh, waveM, rainChance });

  return {
    dayOffset,
    date: new Date(Date.now() + dayOffset * 86400000).toISOString().slice(0, 10),
    status,
    tempMax,
    tempMin,
    rainChance,
    windKmh,
    windGustKmh: windKmh + Math.round(rand() * 12),
    windDirection: ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'][Math.floor(rand() * 8)],
    waveM,
    waterTempC: Math.round(20 + rand() * 6),
    bestWindowStart: '05:30',
    bestWindowEnd: '09:00',
    sky: rainChance >= 60 ? 'Chuvoso' : rainChance >= 30 ? 'Parcialmente nublado' : 'Ensolarado',
  };
}

function buildTides(rand) {
  const base = ['07:42', '13:58', '20:15'];
  return base.map((time, i) => ({
    time,
    type: i % 2 === 0 ? 'alta' : 'baixa',
    heightM: i % 2 === 0 ? +(1.0 + rand() * 0.5).toFixed(1) : +(0.2 + rand() * 0.4).toFixed(1),
  }));
}

function buildAlerts(days, locationName) {
  const alerts = [];
  days.slice(0, 3).forEach((d, idx) => {
    if (d.status === 'nao_recomendado') {
      alerts.push({
        id: `alert-storm-${d.date}`,
        type: 'Tempestade / Mar agitado',
        level: 'alto',
        title: 'Condicoes de risco previstas',
        date: d.date,
        window: 'Durante o dia',
        region: locationName,
        description: `Previsao de vento de ate ${d.windGustKmh} km/h e ondas de ate ${d.waveM} m.`,
        recommendation:
          'Evite sair ao mar durante o periodo indicado. Consulte novamente as condicoes antes de iniciar a atividade.',
        source: 'Simulacao local (substituir por fonte oficial)',
        updatedAt: new Date().toISOString(),
        group: idx === 0 ? 'ativo' : 'proximo',
      });
    } else if (d.status === 'atencao') {
      alerts.push({
        id: `alert-wind-${d.date}`,
        type: 'Vento forte',
        level: 'medio',
        title: 'Vento forte previsto',
        date: d.date,
        window: '15h as 19h',
        region: locationName,
        description: `Rajadas podem ultrapassar ${d.windGustKmh} km/h.`,
        recommendation: 'Tenha atencao redobrada ao sair ao mar neste periodo.',
        source: 'Simulacao local (substituir por fonte oficial)',
        updatedAt: new Date().toISOString(),
        group: idx === 0 ? 'ativo' : 'proximo',
      });
    }
  });
  return alerts;
}

export async function fetchConditions(location) {
  if (!location) throw new Error('Localizacao nao informada');

  await new Promise((resolve) => setTimeout(resolve, 400));

  const rand = seededRandom(`${location.id}-${new Date().toDateString()}`);
  const days = Array.from({ length: 7 }, (_, i) => buildDay(rand, i));
  const today = days[0];

  return {
    location,
    today,
    forecast: days,
    tides: buildTides(rand),
    alerts: buildAlerts(days, location.name),
    sunrise: '06:05',
    sunset: '18:42',
    fetchedAt: new Date().toISOString(),
  };
}

export { classify as classifyConditions };
