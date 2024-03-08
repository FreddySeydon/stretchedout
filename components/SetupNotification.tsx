import React, {useState, useEffect} from 'react'
import { Text, View, Spinner, Button, XStack } from 'tamagui'
import { Platform } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { notificationPermissionRequest } from '~/utils/notificationPermission'
import scheduleDailyReminder from './scheduleDailyReminder'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const SetupNotification = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [isReminderSet, setIsReminderSet] = useState(false);
    const [reminderTime, setReminderTime] = useState('')

    useEffect(() => {
        const getReminderInfo = async() => {
            const isReminder = await AsyncStorage.getItem('reminder');
            isReminder === 'true' ? setIsReminderSet(true) : setIsReminderSet(false);
            const remTime = await AsyncStorage.getItem('reminderTime');
            remTime ? setReminderTime(remTime) : setReminderTime('');
        }
        getReminderInfo()
    }, [])

    const clearReminder = async () => {
        console.log('clearreminder invoked')
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.setItem('reminder', 'false');
        setIsReminderSet(false);
        await AsyncStorage.removeItem('reminderTime');
        setReminderTime('');
    }

    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (selectedDate !== undefined){
           const scheduledTime = await scheduleDailyReminder(currentDate.getHours(), currentDate.getMinutes());
           setIsReminderSet(true);
           setReminderTime(scheduledTime);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const notificationSetupHandler = async () => {
        const permissionGranted = await notificationPermissionRequest()
        if(permissionGranted) {
            showTimepicker()
        }
        return
    }

    return (
        <View>
            <XStack>
            <Button onPress={notificationSetupHandler} backgroundColor={'rgba(196, 176, 113, 0.55)'} fontSize={'$5'}>Set Reminder</Button>
            {show && (
                <RNDateTimePicker
                    mode={mode}
                    value={date}
                    onChange={onChange}
                    is24Hour={true}
                />
            )}
            {isReminderSet ? <Button onPress={clearReminder} backgroundColor={'rgba(133, 119, 87, 0.72)'} size={'$3'} color={'white'} alignSelf='center' borderRadius={30} marginLeft={'$2'}>x</Button> : null}
            </XStack>
            {reminderTime ? <Text>Reminder set to: {reminderTime} </Text> : null}
            
        </View>
    )
}

export default SetupNotification
