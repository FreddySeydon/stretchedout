import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export async function notificationPermissionRequest() {

    const { status } = await Notifications.requestPermissionsAsync();
    console.log(status)
    if (status !== 'granted') {
      console.warn("Permission for notifications wasn't granted.");
      Alert.alert('Permission refused', 'You have to grant permission in order to use the reminder.', [
        {text: 'Ok',
        style: 'cancel'}
      ])
      return false;}
    return true;
}
