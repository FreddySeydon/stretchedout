import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, Spinner } from 'tamagui'
import { getOneExercise } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'
import { Exercise, QueryResult, OneExercise } from '~/types'

const ExerciseDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState<OneExercise | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getExercise = async() => {
        setIsLoading(true)
        const results: QueryResult<Exercise> = await getOneExercise(params.id);
        setExerciseData(results!.rows[0]);
      }
      getExercise()
    }, [])

    useEffect(() => {
      if(exerciseData !== null){
        setIsLoading(false)
        console.log(exerciseData.description)
      }
    }, [exerciseData])

    
  return (
    <View p="$2">
      {isLoading ? <Spinner /> : <ExerciseDetailContent exerciseData={exerciseData!} />}
      <ExerciseStartButton exerciseId={params.id}/>
    </View>
  )
}

export default ExerciseDetail
