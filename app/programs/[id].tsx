import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, Spinner, Button } from 'tamagui'
import { getOneExercise, getOneProgram, getOneProgramExercises, getOneProgramInfo } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'

const ProgramDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [programData, setProgramData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseIds, setExerciseIds] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (params.id) { // Ensure params.id is available
        setIsLoading(true);
        const exercisesResults = await getOneProgramExercises(params.id);
        setExerciseData(exercisesResults);
  
        const programResults = await getOneProgram(params.id);
        setProgramData(programResults[0]);
        setIsLoading(false);
      }
    };
  
    fetchAllData();
  }, [params.id]); // React to changes in params.id
  

  const writeExerciseIds = () => {
    const Ids = exerciseData.map((exercise) => {
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
      {isLoading ? <Spinner size='large' alignSelf='center' justifyContent='center'/> : <View><ExerciseDetailContent exerciseData={programData} />
      <ExerciseStartButton exerciseId={exerciseIds}/></View>
      }
    </View>
  )
}

export default ProgramDetail
