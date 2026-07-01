# Apoio à Pesca — App Mobile (Expo / React Native)

Protótipo navegável do aplicativo de apoio à pesca, construído a partir do
"Guia de Fluxo de Telas" e do relatório de feedback/avaliação técnica da
UNIVALI. JavaScript puro (sem TypeScript), Expo + React Navigation.

## ⚠️ Importante: este código foi escrito sem rodar `npm install`

Este projeto foi montado em um ambiente sem acesso à internet, então as
dependências **não foram instaladas nem testadas em tempo de execução**.
Antes de usar, em uma máquina com Node.js e internet:

```bash
npm install
npx expo start
```

Se aparecer algum erro de versão de pacote, rode `npx expo install --fix`
para alinhar as versões com o SDK do Expo instalado.

## Estrutura do projeto

```
fishing-app/
  App.js                       Ponto de entrada (Providers + navegação)
  app.json                     Configuração do Expo (permissões, ícone, splash)
  package.json                 Dependências (Expo, React Navigation, AsyncStorage,
                                Expo Location, Expo Notifications, Axios)
  src/
    theme/                     Cores, tipografia e espaçamentos (design tokens)
    context/AppContext.js      Estado global: localização, condições, favoritos,
                                configurações, conectividade (offline/online)
    services/
      storage.js                Wrapper do AsyncStorage (sem login no MVP)
      locationService.js        GPS (Expo Location) + busca/seleção manual de cidade
      notificationService.js    Notificações locais (Expo Notifications)
      weatherService.js         Geração de condições (clima/vento/mar/maré/alertas).
                                 Hoje é simulado; troque por uma API real mantendo
                                 o mesmo formato de retorno (ver comentários no arquivo)
      mockData.js                Cidades, espécies e períodos de defeso (conteúdo
                                 estático, conforme avaliação técnica)
    components/                Cabeçalho, indicador geral, cards de condição/alerta/
                                espécie, busca, chips de filtro, estados vazio/erro/
                                offline, esqueleto de carregamento, botões
    navigation/
      RootNavigator.js          Stack raiz: Splash → Onboarding → Permissão de
                                localização → app principal, + telas de detalhe
      MainTabNavigator.js       Barra inferior: Início, Condições, Espécies,
                                Calendário, Mais
    screens/                   Todas as 23 telas do guia (ver lista abaixo)
```

## Telas implementadas (mapeadas ao guia original)

1. Splash Screen
2–4. Onboarding (3 passos, mesma tela com paginação interna)
5. Solicitação de localização
6. Escolher localização (GPS ou busca manual)
7. Início (com indicador geral, melhor horário, 4 cards, alertas, previsão resumida,
   acessos rápidos — suporta as 3 variações Favorável/Atenção/Não recomendado
   automaticamente, de acordo com os dados)
8. Condições detalhadas (também é a aba "Condições")
9. Previsão dos próximos dias
10. Detalhamento do dia
11–13. Vento, Mar, Maré
14–15. Central de alertas e Detalhe do alerta
16–17. Lista de espécies e Detalhe da espécie
18–19. Calendário (mensal / lista) e Lista de períodos de defeso
20–21. Locais favoritos e Espécies favoritas
22–23. Menu "Mais" e Configurações

Estados especiais (carregamento, offline, erro, localização não encontrada,
busca sem resultado, permissão negada) estão implementados como componentes
reutilizáveis (`SkeletonCard`, `OfflineBanner`, `ErrorState`, `EmptyState`) e
usados dentro das telas relevantes, em vez de telas isoladas — assim eles
aparecem no contexto real onde ocorreriam.

## O que ainda precisa de atenção antes de produção

- **`weatherService.js` é simulado.** Troque pela API real de clima/vento/mar/maré
  (ex.: Open-Meteo, StormGlass) mantendo o formato de retorno usado pelas telas.
- **Espécies e defeso (`mockData.js`) são dados de exemplo.** Substitua pelo
  conteúdo oficial (ex.: regras do IBAMA por região).
- **Notificações agendadas** (`notificationService.js`) disparam imediatamente
  no exemplo; ajuste o `trigger` para os horários reais dos alertas.
- Teste em dispositivo real os fluxos de permissão negada de localização e
  notificações (o app não deve travar em nenhum dos dois casos).
