import React, {useEffect, useState} from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text, View, Spinner, Button, Sheet, Image, XStack, ScrollView, YStack, H2, H3, Paragraph, H4} from 'tamagui'
import { getOneExercise, getOneProgram, getOneProgramExercises, getOneProgramInfo } from '~/utils/db'
import ExerciseDetailContent from '~/components/ExerciseDetailContent'
import ExerciseStartButton from '~/components/ExerciseStartButton'
import { type Exercise, ProgramInfo } from '~/types'
import { logWithoutImage } from '~/utils/utils'
import { formatTime } from '~/utils/utils'

const ProgramDetail = () => {
    const params = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState<Exercise[] | null>(null);
    const [programData, setProgramData] = useState<ProgramInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseIds, setExerciseIds] = useState<string | null>(null);
    const [showExercises, setShowExercises] = useState(false)
    const navigation = useNavigation();

  useEffect(() => {
    const fetchAllData = async () => {
      if (params.id) {
        setIsLoading(true);
        const exercisesResults = await getOneProgramExercises(params.id);
        // logWithoutImage("Exercises ID page: ",exercisesResults)
        
        logWithoutImage("Program ID page: ", programData)
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
    <View p="$2" gap='$2'>
      {isLoading ? <Spinner size='large' alignSelf='center' justifyContent='center'/> : <View><ExerciseDetailContent exerciseData={exerciseData!} programData={programData ? programData : undefined} />
      <ExerciseStartButton exerciseId={exerciseIds!} programName={programData?.name} programId={programData?.id}/></View>
      }
      {programData ? <View pr="$3" pl="$3"><Button onPress={()=>setShowExercises(!showExercises)} backgroundColor={'white'} pr="$3" pl="$3" pressStyle={{backgroundColor: 'rgba(196, 176, 113, 0.55)', borderColor: 'rgba(196, 176, 113, 0.55)'}}><Text>Show Exercises</Text></Button></View> : null}
       {programData ? <Sheet open={showExercises} dismissOnSnapToBottom={true} forceRemoveScrollEnabled={false} onOpenChange={()=>setShowExercises(!showExercises)} snapPoints={[85]} snapPointsMode='percent' modal>
        <Sheet.Overlay backgroundColor={'transparent'} />
        <Sheet.Handle backgroundColor={'#f2f2f2'}/>
        <Sheet.Frame backgroundColor={'#f2f2f2'} p="$5">
          <H3 pl='$2' color={'black'} alignSelf='center' marginBottom='$5'>{exerciseData!.length} exercises in this Program</H3>
          <Sheet.ScrollView>
          {exerciseData?.map((exercise, index) => {
            const textColor = "rgba(74, 74, 74, 1)"
            return(
              <View  key={index}>
                <XStack gap="$3" my='$2' justifyContent='center' alignItems='center'>
                  <YStack backgroundColor={'rgba(196, 176, 113, 0.55)'} borderRadius={10} maxWidth={'45%'} alignItems='center' justifyContent='center'>
                    <Image source={{width: 150, height: 150, uri: exercise.img}} borderTopLeftRadius={10} borderTopRightRadius={10}  />
                    <YStack padding='$2' alignItems='center'>
                    <H3 color={textColor} flexWrap='wrap' textAlign='center' >{exercise.name}</H3>
                    <Paragraph color={"rgba(130, 128, 123, 1)"} style={{fontSize: 15}}>{exercise.duration ? formatTime(exercise.duration) : 0}</Paragraph>
                    </YStack>
                  </YStack>
                    <Paragraph fontSize={17} color={textColor} pb="$2" width={'45%'}>{exercise.description}</Paragraph>
                  {/* <Text width={60} >{exercise.description}</Text> */}

                  {/* <Text >{exercise.sidechange ? 'With side-change' : null}</Text> */}
                </XStack>
              </View>
            )
          })}
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet> : null}
    </View>
  )
}

export default ProgramDetail
