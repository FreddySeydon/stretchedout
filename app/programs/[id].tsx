import React, {useEffect, useState} from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View, Spinner, Button } from 'tamagui'
import { getOneExercise, getOneProgram, getOneProgramExercises, getOneProgramInfo } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'
import { type Exercise, ProgramInfo } from '~/types'
import { logWithoutImage } from '~/utils/utils'

const ProgramDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState<Exercise[] | null>(null);
    const [programData, setProgramData] = useState<ProgramInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseIds, setExerciseIds] = useState<string | null>(null);
    const navigation = useNavigation();

  useEffect(() => {
    const fetchAllData = async () => {
      if (params.id) {
        setIsLoading(true);
        const exercisesResults = await getOneProgramExercises(params.id);
        // logWithoutImage(exercisesResults)
        setExerciseData(exercisesResults);
  
        const programResults = await getOneProgram(params.id);
        setProgramData(programResults);
        setIsLoading(false);
      }
    };
    if(programData){
      navigation.setOptions({ title: `${programData.name} Program`})
    }
    fetchAllData();
  }, [params.id, navigation, programData]);
  

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
      <ExerciseStartButton exerciseId={exerciseIds!} programName={programData?.name} programId={programData?.id}/></View>
      }
    </View>
  )
}

export default ProgramDetail
