import React, {useState, useEffect} from 'react'
import { Text, View, Spinner, Button, XStack, YStack } from 'tamagui'
import { Platform } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { notificationPermissionRequest } from '~/utils/notificationPermission'
import scheduleDailyReminder from './scheduleDailyReminder'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Feather } from '@expo/vector-icons';

const SetupNotification = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<'time' | 'date'>('time');
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

    const onChange: (event: any, selectedDate: Date | undefined) => Promise<void> = async (event, selectedDate) => {
        setShow(false);
        if(event.type === 'dismissed'){
            //Handles dissmissed dialog on Android
            return;
        }
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (selectedDate !== undefined){
           const scheduledTime = await scheduleDailyReminder(currentDate.getHours(), currentDate.getMinutes());
           setIsReminderSet(true);
           setReminderTime(scheduledTime);
        }
    };

    const showMode = (currentMode: 'time' | 'date') => {
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
        <View justifyContent='center' alignItems='center'>
            <XStack>
            {!isReminderSet ? <Button onPress={notificationSetupHandler} backgroundColor={'rgba(196, 176, 113, 0.55)'} fontSize={'$5'}>Set Reminder</Button> : null}
            {show && (
                <RNDateTimePicker
                    mode={mode}
                    value={date}
                    onChange={onChange}
                    is24Hour={true}
                />
            )}
            
            </XStack>
            <YStack alignItems='center' justifyContent='center'>
            {reminderTime ? <Text pt='$2'>Reminder set to: {reminderTime} </Text> : null}
            {isReminderSet ? <Button onPress={clearReminder}  size={'$2'} color={'white'} alignSelf='center' borderRadius={10} marginLeft={'$0'}><Feather name='trash-2' size={20} color={"red"} /></Button> : null}
            </YStack>
        </View>
    )
}

export default SetupNotification
