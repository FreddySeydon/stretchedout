import React from 'react'
import { Text, View, Spinner, YStack } from 'tamagui'
import { useLocalSearchParams } from 'expo-router'

const exercise = () => {
    const exerciseId = useLocalSearchParams()
    console.log(exerciseId)
  return (
    <View>
        <YStack>
            <Text>This will start exercise {exerciseId.id} in the future</Text>
        </YStack>
    </View>
  )
}

export default exercise
