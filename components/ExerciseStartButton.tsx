import React from 'react'
import { Text, View, Spinner, Image, H2, H3, YStack, Paragraph, Button } from 'tamagui';
import { router } from 'expo-router';

const ExerciseStartButton = ({exerciseId, programName, programId}: {exerciseId: number | string[] | string, programName?: string, programId?: string | number | string[]}) => {

  type Params = {
    id: string,
    programName?: string
    programId?: string
  }

    const startExercise = () => {
      const params = createParams()
        router.push({
            pathname: "/exercises/exercise",
            params: params
        })
    }
    const createParams = () => {
      let params: Params = {
        id: `${exerciseId}`
      }
      if(programName && programId) {
        params = {
          id: `${exerciseId}`,
          programName: `${programName}`,
          programId: `${programId}`,
        }
      }
      return params
    }

  return (
    <View pr="$3" pl="$3">
      <Button elevate onPress={startExercise} backgroundColor={'green'}>Start Exercise</Button>
    </View>
  )
}

export default ExerciseStartButton
