// Paleta de cores do aplicativo.
// Regra: cor nunca é usada sozinha — sempre acompanhada de texto/ícone.

export const colors = {
  // Marca / neutros
  background: '#F5F8FA',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF3F6',
  border: '#DCE4E9',
  textPrimary: '#0F2A35',
  textSecondary: '#4A6572',
  textInverse: '#FFFFFF',
  primary: '#0B4F6C',
  primaryDark: '#073A50',
  primaryLight: '#3D7C99',
  accent: '#01A7C2',

  // Classificação geral do dia
  favoravel: '#1E8E5A',
  favoravelBg: '#E3F5EC',
  atencao: '#C97A1A',
  atencaoBg: '#FCEFDD',
  naoRecomendado: '#C23B3B',
  naoRecomendadoBg: '#FBE6E6',

  // Informações neutras
  info: '#1E6FA8',
  infoBg: '#E5F1FA',

  // Estados
  disabled: '#B6C2C9',
  skeleton: '#E2E8EC',
  overlay: 'rgba(15,42,53,0.5)',
};

export const statusColor = (status) => {
  switch (status) {
    case 'favoravel':
      return { fg: colors.favoravel, bg: colors.favoravelBg, label: 'Favorável' };
    case 'atencao':
      return { fg: colors.atencao, bg: colors.atencaoBg, label: 'Atenção' };
    case 'nao_recomendado':
      return { fg: colors.naoRecomendado, bg: colors.naoRecomendadoBg, label: 'Não recomendado' };
    default:
      return { fg: colors.info, bg: colors.infoBg, label: 'Indisponível' };
  }
};
