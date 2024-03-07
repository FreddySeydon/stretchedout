import React from 'react'
import { Text, View, Spinner, Image, H2, H3, YStack, Paragraph, Button } from 'tamagui';
import { router } from 'expo-router';

const ExerciseStartButton = ({exerciseId}) => {

    const startExercise = () => {
        router.push({
            pathname: "/exercises/exercise",
            params: {id: `${exerciseId}`}
        })
    }
  return (
    <View pr="$3" pl="$3">
      <Button elevate onPress={startExercise} backgroundColor={'green'}>Start Exercise</Button>
    </View>
  )
}

export default ExerciseStartButton
