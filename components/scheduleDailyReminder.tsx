import * as Notifications from 'expo-notifications';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function scheduleDailyReminder(hour, minute) {

  // Cancel all previous scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();
  await AsyncStorage.setItem('reminder', 'false')
  await AsyncStorage.removeItem('reminderTime')

  // Schedule a new daily notification
  const scheduledNotification = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Stretch!",
      body: "Take a moment to do some stretching exercises.",
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
  const reminderTime = `${hour}:${minute}`
  await AsyncStorage.setItem('reminder', 'true');
  await AsyncStorage.setItem('reminderTime', `${hour}:${minute}`);
  ToastAndroid.show(`Reminder set to ${hour}:${minute}`, 3)
  console.log('Notification set successfully')
  return reminderTime;
}
