import React, {useState, useEffect} from 'react'
import { Text, View, Spinner, YStack } from 'tamagui'
import { useLocalSearchParams } from 'expo-router'
import { getMultipleExercises } from '~/utils/db'
import ExercisePlayer from '~/components/ExercisePlayer'
import { router } from 'expo-router'

const exercise = () => {
    const exerciseIds = useLocalSearchParams()
    const idArray = exerciseIds.id.split(", ");
    const [exerciseArray, setExerciseArray] = useState(idArray)
    const [exercises, setExercises] = useState([])
    const [singleExercise, setSingleExercise] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [remainingDuration, setRemainingDuration] = useState(exercises.length > 0 ? exercises[0].duration : 0)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [isLastExercise, setIsLastExercise] = useState(false)

    const previousExercise = () => {
      setCurrentExerciseIndex(currentExerciseIndex-1)
    }

    const handleCountDownComplete = () => {
      setCurrentExerciseIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= exercises.length) {
          router.back()
          return currentIndex
        }
        return nextIndex
      })
    }

    // useEffect(() =>  {
    //   if(currentExerciseIndex - 1 >= exercises.length){
    //     setIsLastExercise(true)
    //   }
    // }, [currentExerciseIndex])

    useEffect(() => {
      if (exercises.length > 0) {
        setRemainingDuration(exercises[currentExerciseIndex].duration)
        setSingleExercise(exercises[currentExerciseIndex]);
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

  return (
    <View>
        <YStack>
          {isLoading ? <Spinner /> : <ExercisePlayer onCountDownComplete={handleCountDownComplete} isLastExercise={isLastExercise} previousExercise={previousExercise} currentExerciseIndex={currentExerciseIndex} singleExercise={singleExercise} remainingDuration={remainingDuration} setRemainingDuration={setRemainingDuration} /> }
        </YStack>
    </View>
  )
}

export default exercise
