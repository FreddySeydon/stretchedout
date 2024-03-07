import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, Spinner } from 'tamagui'
import { getOneExercise, getOneProgramDuration, getOneProgramExercises, getOneProgramInfo } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'

const ProgramDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [programDetail, setProgramDetail] = useState(null);
    const [programDuration, setProgramDuration] = useState(null);
    const [programData, setProgramData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getExercises = async() => {
            setIsLoading(true);
            const results = await getOneProgramExercises(params.id)
            setExerciseData(results);
        }

      const getProgram = async() => {
        setIsLoading(true)
        const results = await getOneProgramInfo(params.id);
        setProgramData(results);
        const duration = await getOneProgramDuration(params.id)
        setProgramDuration(duration.program_duration)
        writeProgramDetail()
      }
      getExercises()
      getProgram()
    }, [])

    const writeProgramDetail = () => {
        if(programData !== null){
            const programDetail = {
                id: params.id,
                description: programData.description,
                duration: programDuration,
                img: programData.img,
                name: programData.name
            }
            setProgramDetail(programDetail);
        }
    }

    useEffect(() => {
      if(exerciseData !== null){
        setIsLoading(false)
      }
    }, [exerciseData])

    
  return (
    <View p="$2">
      {isLoading ? <Spinner /> : <ExerciseDetailContent exerciseData={programDetail} />}
      <ExerciseStartButton exerciseId={params.id}/>
    </View>
  )
}

export default ProgramDetail
