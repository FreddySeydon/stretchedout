import React, {useState, useEffect} from 'react'
import { Text, View, Spinner, YStack } from 'tamagui'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { getMultipleExercises } from '~/utils/db'
import ExercisePlayer from '~/components/ExercisePlayer'
import { router } from 'expo-router'
import { type Exercise } from '~/types'




const exercise = () => {
    const exerciseParams: {id?: string, programId?: string, programName?: string} = useLocalSearchParams() //id is allowed to be possibly undefined because of the nature of useLocalSearchParams
    const {programId = "", programName = ""} = exerciseParams || {}
    const idArray = exerciseParams.id ? exerciseParams.id.split(", ") : [];
    const [exerciseArray, setExerciseArray] = useState<string[]>(idArray);
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [singleExercise, setSingleExercise] = useState<Exercise | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [remainingDuration, setRemainingDuration] = useState(exercises ? exercises.length > 0 ? exercises[0].duration : 0 : 0)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [isLastExercise, setIsLastExercise] = useState(false)
    const navigation = useNavigation();

    const previousExercise = () => {
      setCurrentExerciseIndex(currentExerciseIndex-1)
    }

    const checkIsLastExercise = () => {
      const nextIndex = currentExerciseIndex + 1;
      if(nextIndex >= exercises!.length){
        setIsLastExercise(true);
      }
    }

    const handleCountDownComplete = () => {
      setCurrentExerciseIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= exercises!.length) {
          router.back()
          return currentIndex
        }
        return nextIndex
      })
    }

    useEffect(() => {
      if(exercises){
        if (exercises!.length > 0) {
          setRemainingDuration(exercises![currentExerciseIndex].duration)
          setSingleExercise(exercises![currentExerciseIndex]);
          checkIsLastExercise();
        }
      }
    }, [currentExerciseIndex, exercises])

    useEffect(() => {
        const getExercises = async () => {
            setIsLoading(true)
            const results = await getMultipleExercises(exerciseArray);
            setExercises(results);
            setIsLoading(false);
        }
        getExercises()
    }, [])

    useEffect(() => {
      if(exercises){
        const title = programName ? `${programName} Program` : `${exercises[currentExerciseIndex].name}`
        navigation.setOptions({ title: title})
      }
    }, [exercises, singleExercise])

  return (
    <View>
        <YStack>
          {isLoading ? <Spinner /> : <ExercisePlayer onCountDownComplete={handleCountDownComplete} isLastExercise={isLastExercise} previousExercise={previousExercise} currentExerciseIndex={currentExerciseIndex} singleExercise={singleExercise} remainingDuration={remainingDuration} setRemainingDuration={setRemainingDuration} /> }
        </YStack>
    </View>
  )
}

export default exercise
