import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, Spinner } from 'tamagui'
import { getOneExercise } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'

const ExerciseDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getExercise = async() => {
        setIsLoading(true)
        const results = await getOneExercise(params.id);
        setExerciseData(results.rows[0]);
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
      {isLoading ? <Spinner /> : <ExerciseDetailContent exerciseData={exerciseData} />}
      <ExerciseStartButton exerciseId={params.id}/>
    </View>
  )
}

export default ExerciseDetail
