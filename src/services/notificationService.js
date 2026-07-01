import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Centraliza a configuracao de notificacoes locais (alertas de clima, vento,
// mar e defeso). As notificacoes dependem de permissao do usuario; o app
// continua funcional mesmo se ela for negada (alertas ainda aparecem na
// Central de Alertas dentro do app).

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('alerts', {
      name: 'Alertas de pesca',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  return status === 'granted';
}

export async function scheduleLocalAlert(alert) {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: alert.title,
      body: alert.description,
      data: { alertId: alert.id },
    },
    trigger: null, // dispara imediatamente; trocar por trigger real em producao
  });
}
