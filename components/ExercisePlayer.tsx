import React, {useEffect, useState} from 'react'
import { View, YStack, XStack, ProgressIndicator, Image, Dialog, H2, Text, Button, VisuallyHidden} from 'tamagui'
import { useLocalSearchParams } from 'expo-router'
import { getMultipleExercises } from '~/utils/db'
import CountdownTimer from './CountdownTimer'
import { Touchable, TouchableOpacity } from 'react-native'

const ExercisePlayer = ({singleExercise, remainingDuration, setRemainingDuration, onCountDownComplete, previousExercise, currentExerciseIndex, isLastExercise}) => {
    const {name, id, duration, img} = singleExercise

    // console.log("Is Last: ",isLastExercise)

  return (
    <View>
              <YStack p="$3">
        <Image source={{ uri: img }} style={{ width: 'fit', height: 400, borderRadius: 10}} />
        <YStack backgroundColor={'rgba(196, 176, 113, 0.55)'} borderBottomLeftRadius={10} borderBottomRightRadius={10} p="$3">
          <H2 color={'black'} >{name}</H2>
        </YStack>
        <YStack>
        <CountdownTimer onCountDownComplete={onCountDownComplete} initialDuration={duration} remainingDuration={remainingDuration} setRemainingDuration={setRemainingDuration} />
        <XStack space width={'fit'} alignSelf='center'>
        {currentExerciseIndex === 0 ? <VisuallyHidden>
            <Button></Button>
        </VisuallyHidden> : <Button onPress={previousExercise} backgroundColor={'rgba(196, 176, 113, 0.55)'} width={'33%'}><Text>Previous</Text></Button>}
        <VisuallyHidden>
        <Button onPress={onCountDownComplete} backgroundColor={'rgba(196, 176, 113, 0.55)'} width={'33%'}>Play</Button>
        </VisuallyHidden>
        <Button onPress={onCountDownComplete} backgroundColor={'rgba(196, 176, 113, 0.55)'} width={'33%'}>{isLastExercise ? 'End' : 'Next'}</Button>
        </XStack>
        </YStack>
      </YStack>
    </View>
  )
}

export default ExercisePlayer
