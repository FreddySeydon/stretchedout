import React, {useEffect, useState} from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View, Spinner } from 'tamagui'
import { getOneExercise } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'
import { Exercise, QueryResult } from '~/types'

const ExerciseDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState<Exercise | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation()

    useEffect(() => {
      const getExercise = async() => {
        setIsLoading(true)
        const exercise: Exercise | null = params.id ? await getOneExercise(params.id) : null;
        setExerciseData(exercise);
      }
      getExercise()
    }, [])

    useEffect(() => {
      if(exerciseData !== null){
        setIsLoading(false)
        navigation.setOptions({ title: `${exerciseData.name} Exercise`})
        // console.log(exerciseData.description)
      }
    }, [exerciseData])

    
  return (
    <View p="$2">
      {isLoading ? <Spinner /> : <ExerciseDetailContent exerciseData={exerciseData!} />}
      <ExerciseStartButton exerciseId={params.id ? params.id : "0"}/>
    </View>
  )
}

export default ExerciseDetail
