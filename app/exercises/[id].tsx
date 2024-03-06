import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'tamagui'

const ExerciseDetail = () => {
    const {slug} = useLocalSearchParams();
  return (
    <View>
      <Text>This is the detail page for {slug}</Text>
    </View>
  )
}

export default ExerciseDetail
