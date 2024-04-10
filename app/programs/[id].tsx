import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, Spinner, Button } from 'tamagui'
import { getOneExercise, getOneProgram, getOneProgramExercises, getOneProgramInfo } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'
import { type Exercise, Programs, OneProgramInfo, OneProgram } from '~/types'

const ProgramDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState<Exercise | null>(null);
    const [programData, setProgramData] = useState<OneProgram | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseIds, setExerciseIds] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (params.id) {
        setIsLoading(true);
        const exercisesResults = await getOneProgramExercises(params.id);
        setExerciseData(exercisesResults);
  
        const programResults = await getOneProgram(params.id);
        setProgramData(programResults[0]);
        setIsLoading(false);
      }
    };
  
    fetchAllData();
  }, [params.id]);
  

  const writeExerciseIds = () => {
    const Ids = exerciseData!.map((exercise) => {
      return exercise.id
    })
    const idString = Ids.join(', ')
    setExerciseIds(idString);
  }

    useEffect(() => {
      if(programData && exerciseData !== null){
        setIsLoading(false)
        writeExerciseIds()
      }
    }, [programData, exerciseData])

    
  return (
    <View p="$2">
      {isLoading ? <Spinner size='large' alignSelf='center' justifyContent='center'/> : <View><ExerciseDetailContent exerciseData={programData!} />
      <ExerciseStartButton exerciseId={exerciseIds!}/></View>
      }
    </View>
  )
}

export default ProgramDetail
