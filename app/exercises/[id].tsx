import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'tamagui'

const ExerciseDetail = () => {
    const params = useLocalSearchParams();
    console.log(useLocalSearchParams())
  return (
    <View>
      <Text>This is the detail page for {params.id}</Text>
    </View>
  )
}

export default ExerciseDetail
