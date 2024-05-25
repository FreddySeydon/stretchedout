import React, {useEffect, useState} from 'react'
import { View, YStack, XStack, ProgressIndicator, Image, Dialog, H2, Text, Button, VisuallyHidden} from 'tamagui'
import { useLocalSearchParams } from 'expo-router'
import { getMultipleExercises } from '~/utils/db'
import CountdownTimer from './CountdownTimer'
import { Touchable, TouchableOpacity, Pressable } from 'react-native'
import { type Exercise } from '~/types'
import { AntDesign } from '@expo/vector-icons'

type ExercisePlayerProps = {
  singleExercise: Exercise | null,
  remainingDuration: number,
  setRemainingDuration: React.Dispatch<React.SetStateAction<number>>,
  onCountDownComplete: () => void,
  previousExercise: () => void, 
  currentExerciseIndex: number, 
  isLastExercise: boolean,
  numberOfExercises?: number | undefined,

}

const ExercisePlayer = ({singleExercise, remainingDuration, setRemainingDuration, onCountDownComplete, previousExercise, currentExerciseIndex, isLastExercise, numberOfExercises}: ExercisePlayerProps) => {
  
   const {name = "", id = 0, duration = 0, img = ""} = singleExercise ? singleExercise : {}
   const [isPaused, setIsPaused] = useState(false);

   const togglePause = () => {
    setIsPaused(!isPaused)
}

  return (
    <View>
              <YStack p="$2">
        <Image source={{ uri: img }} style={{ width: 'fit', height: 350, borderRadius: 10}} />
        <YStack backgroundColor={'rgba(196, 176, 113, 0.55)'} borderBottomLeftRadius={10} borderBottomRightRadius={10} p="$3" justifyContent='center' alignItems='center'>
          <H2 color={'black'} >{name}</H2>
          {numberOfExercises ? <Text>{currentExerciseIndex + 1}/{numberOfExercises}</Text> : null}
        </YStack>
        <YStack >
        <CountdownTimer onCountDownComplete={onCountDownComplete} initialDuration={duration} remainingDuration={remainingDuration} setRemainingDuration={setRemainingDuration} isPaused={isPaused} setIsPaused={setIsPaused} />
        <XStack justifyContent='center' alignItems='baseline'>
        {currentExerciseIndex === 0 ?
            <Button disabled borderRadius={100} onPress={previousExercise} backgroundColor={'rgba(196, 176, 113, 0.0)'} color={'rgb(180, 180, 180)'} height={'fit-content'} pressStyle={{backgroundColor: 'transparent', borderColor: 'transparent', scale: 0.5}}><AntDesign name="leftcircle" size={50} color="rgba(196, 176, 113, 0.2)" /></Button>
        : <Button onPress={previousExercise} backgroundColor={'rgba(196, 176, 113, 0.0)'} height={'fit-content'} pressStyle={{backgroundColor: 'transparent', borderColor: 'transparent', scale: 0.7}}><AntDesign name="leftcircle" size={50} color="rgba(196, 176, 113, 0.55)" /></Button>}
        
        <Button onPress={togglePause} backgroundColor={'rgba(196, 176, 113, 0.0)'} height={'fit-content'} pressStyle={{backgroundColor: 'transparent', borderColor: 'transparent', scale: 0.9}} >{isPaused ? <AntDesign name="play" size={80} color="rgba(196, 176, 113, 0.55)" /> : <AntDesign name="pausecircle" pressStyle={{backgroundColor: '$colorTransparent'}} size={80} color="rgba(196, 176, 113, 0.55)" />}</Button>
        <Button onPress={onCountDownComplete} backgroundColor={'rgba(196, 176, 113, 0.0)'} height={'fit-content'} width={'fit-content'} borderRadius={200} pressStyle={{backgroundColor: 'transparent', borderColor: 'transparent', scale: 0.7}} hoverStyle={{backgroundColor: '$backgroundTransparent'}}>{isLastExercise ? <AntDesign name="flag" size={50} color="rgba(196, 176, 113, 0.55)" /> : <AntDesign name="rightcircle" size={50} color="rgba(196, 176, 113, 0.55)" />}</Button>
        </XStack>
        </YStack>
      </YStack>
    </View>
  )
}

export default ExercisePlayer
