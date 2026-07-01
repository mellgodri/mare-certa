// Content ported from "App de Pesca.dc.html" (Guia de fluxo de telas).

export const STATUS = {
  favoravel: {
    kicker: "Hoje",
    label: "Favorável",
    bg: "#e3f3e9",
    fg: "#1f7a4d",
    solid: "#2a8d5c",
    heroBg: "linear-gradient(160deg,#1f8d57,#0f7a59)",
    heroSolid: "#168153",
  },
  atencao: {
    kicker: "Hoje",
    label: "Atenção",
    bg: "#fdf0dd",
    fg: "#9a5b00",
    solid: "#d4870f",
    heroBg: "linear-gradient(160deg,#d98a17,#bf6f0c)",
    heroSolid: "#c8780f",
  },
  naoRecomendado: {
    kicker: "Hoje",
    label: "Não rec.",
    bg: "#fbe6e3",
    fg: "#a32f22",
    solid: "#cc3b29",
    heroBg: "linear-gradient(160deg,#cf4030,#a8281c)",
    heroSolid: "#bd3526",
  },
};

export const SCENARIOS = ["favoravel", "atencao", "naoRecomendado"];

export const SCENARIO_LABELS = {
  favoravel: "Favorável",
  atencao: "Atenção",
  naoRecomendado: "Não recomendado",
};

export const SCEN = {
  favoravel: {
    best: "05h30 às 09h00",
    temp: 24,
    feels: 25,
    sky: "Parcialmente nublado",
    skyKind: "cloud",
    rain: 10,
    water: 23,
    windV: 8,
    windLabel: "Vento fraco",
    windDir: "Nordeste",
    windDeg: 45,
    gust: 14,
    waves: "0,4–0,6 m",
    wavesAvg: 0.5,
    seaLabel: "Mar calmo",
    sunrise: "06h18",
    sunset: "17h32",
    reasons: [
      "Vento fraco e constante de NE",
      "Mar calmo, ondas abaixo de 0,6 m",
      "Sem previsão de chuva pela manhã",
    ],
    alerts: [],
  },
  atencao: {
    best: "05h00 às 08h00",
    temp: 22,
    feels: 21,
    sky: "Nublado com pancadas",
    skyKind: "rain",
    rain: 60,
    water: 22,
    windV: 28,
    windLabel: "Vento forte",
    windDir: "Sudeste",
    windDeg: 135,
    gust: 40,
    waves: "1,2–1,5 m",
    wavesAvg: 1.35,
    seaLabel: "Mar levemente agitado",
    sunrise: "06h20",
    sunset: "17h30",
    reasons: [
      "Vento acima de 25 km/h à tarde",
      "Possibilidade de chuva no fim da tarde",
      "Ondas aumentando após as 16h",
    ],
    alerts: [
      {
        type: "Vento forte previsto",
        time: "Hoje, entre 15h e 19h",
        level: "atencao",
        desc: "Rajadas podem ultrapassar 40 km/h. Atenção redobrada ao sair ao mar.",
      },
    ],
  },
  naoRecomendado: {
    best: "Sem janela segura hoje",
    temp: 20,
    feels: 18,
    sky: "Tempestade",
    skyKind: "storm",
    rain: 90,
    water: 21,
    windV: 45,
    windLabel: "Vento muito forte",
    windDir: "Sul",
    windDeg: 180,
    gust: 62,
    waves: "2,5–3,0 m",
    wavesAvg: 2.75,
    seaLabel: "Mar agitado",
    sunrise: "06h21",
    sunset: "17h29",
    reasons: [
      "Mar agitado, ondas acima de 2,5 m",
      "Tempestade prevista durante o dia",
      "Rajadas de vento acima de 60 km/h",
    ],
    alerts: [
      {
        type: "Tempestade a caminho",
        time: "Hoje, a partir das 11h",
        level: "perigo",
        desc: "Tempestade com raios e ventos intensos. Evite qualquer saída ao mar.",
      },
      {
        type: "Mar agitado",
        time: "Durante todo o dia",
        level: "perigo",
        desc: "Ondas acima de 2,5 m. Condição de risco para embarcações de pequeno porte.",
      },
    ],
  },
};

export const FORECAST = [
  { day: "Hoje", full: "Quinta · 12 jun", sky: "Parcialmente nublado", skyKind: "cloud", rating: "favoravel", min: 18, max: 24, rain: 10, wind: 8, sea: "Calmo", best: "05h30–09h00" },
  { day: "Amanhã", full: "Sexta · 13 jun", sky: "Chuva e vento", skyKind: "rain", rating: "atencao", min: 17, max: 22, rain: 60, wind: 28, sea: "Agitando", best: "05h00–07h30" },
  { day: "Sábado", full: "Sábado · 14 jun", sky: "Mar agitado", skyKind: "storm", rating: "naoRecomendado", min: 16, max: 21, rain: 90, wind: 45, sea: "Agitado", best: "—" },
  { day: "Domingo", full: "Domingo · 15 jun", sky: "Sol entre nuvens", skyKind: "sun", rating: "favoravel", min: 19, max: 25, rain: 15, wind: 10, sea: "Calmo", best: "06h00–10h00" },
  { day: "Segunda", full: "Segunda · 16 jun", sky: "Ensolarado", skyKind: "sun", rating: "favoravel", min: 20, max: 26, rain: 5, wind: 9, sea: "Calmo", best: "05h30–09h30" },
];

export const TIDES = [
  { label: "Maré alta", time: "07h42", h: "1,3 m" },
  { label: "Maré baixa", time: "13h58", h: "0,4 m" },
  { label: "Maré alta", time: "20h15", h: "1,2 m" },
];

export const SPECIES = [
  { id: "tainha", name: "Tainha", sci: "Mugil liza", env: "Água salgada", status: "permitida", minSize: "35 cm", defeso: "1 mai – 31 jul (defeso da tainha)", period: "Permitida fora do defeso reprodutivo", art: "linear-gradient(135deg,#5a7d8c,#3d5a68)", note: "Pesca permitida no período atual. Respeite o tamanho mínimo de 35 cm." },
  { id: "camarao", name: "Camarão-rosa", sci: "Penaeus paulensis", env: "Água salgada", status: "defeso", minSize: "—", defeso: "28 jan – 30 abr", period: "Proibida durante o defeso reprodutivo", art: "linear-gradient(135deg,#d98a8a,#bf6f6f)", note: "Pesca proibida no momento. Espécie em período de defeso até 30 de abril." },
  { id: "robalo", name: "Robalo-peva", sci: "Centropomus parallelus", env: "Água salgada", status: "permitida", minSize: "40 cm", defeso: "Sem defeso vigente na região", period: "Permitida o ano todo", art: "linear-gradient(135deg,#6b8a78,#4d6a58)", note: "Pesca permitida. Tamanho mínimo de 40 cm na região consultada." },
  { id: "anchova", name: "Anchova", sci: "Pomatomus saltatrix", env: "Água salgada", status: "permitida", minSize: "25 cm", defeso: "Sem defeso vigente", period: "Permitida", art: "linear-gradient(135deg,#5a708c,#3d5068)", note: "Pesca permitida. Espécie comum no inverno na costa catarinense." },
  { id: "tilapia", name: "Tilápia", sci: "Oreochromis niloticus", env: "Água doce", status: "permitida", minSize: "Sem mínimo", defeso: "Sem defeso", period: "Permitida", art: "linear-gradient(135deg,#7d8a5a,#5a6840)", note: "Pesca permitida em água doce. Sem período de defeso." },
  { id: "corvina", name: "Corvina", sci: "Micropogonias furnieri", env: "Água salgada", status: "permitida", minSize: "25 cm", defeso: "Sem defeso vigente", period: "Permitida", art: "linear-gradient(135deg,#5a8088,#3d6068)", note: "Pesca permitida. Tamanho mínimo de 25 cm." },
];

export const DEFESO = [
  { name: "Camarão-rosa", sci: "Penaeus paulensis", start: "28 jan", end: "30 abr", region: "Litoral de SC", days: 42, status: "vigente" },
  { name: "Tainha", sci: "Mugil liza", start: "1 mai", end: "31 jul", region: "Litoral Sul/Sudeste", days: 18, status: "vigente" },
  { name: "Robalo-peva", sci: "Centropomus parallelus", start: "15 dez", end: "15 fev", region: "Litoral de SC", days: 0, status: "encerrado" },
];

export const FAVS = [
  { city: "Balneário Piçarras", uf: "SC", rating: "favoravel", note: "Favorável — vento fraco" },
  { city: "Penha", uf: "SC", rating: "atencao", note: "Atenção — previsão de chuva" },
  { city: "Itajaí", uf: "SC", rating: "favoravel", note: "Favorável — mar calmo" },
];

export const CITIES = [
  { name: "Balneário Piçarras", region: "Santa Catarina", rating: "favoravel" },
  { name: "Penha", region: "Santa Catarina", rating: "atencao" },
  { name: "Itajaí", region: "Santa Catarina", rating: "favoravel" },
  { name: "Navegantes", region: "Santa Catarina", rating: "favoravel" },
  { name: "Bombinhas", region: "Santa Catarina", rating: "naoRecomendado" },
];

export const JUMP_SCREENS = [
  ["splash", "Splash"],
  ["onboarding", "Onboarding"],
  ["permission", "Permissão de localização"],
  ["location", "Escolher localização"],
  ["home", "Tela inicial"],
  ["conditions", "Condições detalhadas"],
  ["forecast", "Previsão dos dias"],
  ["wind", "Vento"],
  ["sea", "Condições do mar"],
  ["tide", "Maré"],
  ["alerts", "Central de alertas"],
  ["species", "Lista de espécies"],
  ["calendar", "Calendário"],
  ["defesoList", "Períodos de defeso"],
  ["more", "Mais"],
  ["settings", "Configurações"],
  ["favLocations", "Locais favoritos"],
  ["errorUpdate", "Estado de erro"],
];

export const SCREEN_TITLES = {
  conditions: "Condições",
  forecast: "Próximos dias",
  dayDetail: "Detalhe do dia",
  wind: "Vento",
  sea: "Condições do mar",
  tide: "Maré",
  alerts: "Alertas",
  alertDetail: "Detalhe do alerta",
  species: "Espécies",
  speciesDetail: "Espécie",
  calendar: "Calendário",
  defesoList: "Períodos de defeso",
  more: "Mais",
  settings: "Configurações",
  favLocations: "Locais favoritos",
  errorUpdate: "Não foi possível atualizar",
};

export const NO_NAV_SCREENS = ["splash", "onboarding", "permission", "location"];
export const SUB_LOCATION_SCREENS = ["conditions", "forecast", "dayDetail", "wind", "sea", "tide"];

export const TAB_FOR_SCREEN = {
  home: "home",
  conditions: "cond",
  forecast: "cond",
  dayDetail: "cond",
  wind: "cond",
  sea: "cond",
  tide: "cond",
  species: "fish",
  speciesDetail: "fish",
  calendar: "cal",
  defesoList: "cal",
  more: "more",
  settings: "more",
  favLocations: "more",
  errorUpdate: "cond",
  alerts: "home",
  alertDetail: "home",
};

export function badgeOf(scenarioKey) {
  const st = STATUS[scenarioKey];
  return { text: st.label, bg: st.bg, fg: st.fg };
}
