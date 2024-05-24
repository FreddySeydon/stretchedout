import { blue } from '@tamagui/themes';
import React, {useState, useEffect} from 'react';
import { Text, View, Spinner, Image, H2, H3, YStack, Paragraph } from 'tamagui';
import { Exercise, ProgramInfo } from '~/types';
import { formatTime } from '~/utils/utils';

const ExerciseDetailContent = ({ exerciseData, programData }: {exerciseData: Exercise[] | Exercise, programData?: ProgramInfo}) => {
  const [exercises, setExercises] = useState<Exercise[] | Exercise | null>(exerciseData)
  const [program, setProgram] = useState<ProgramInfo | null>(programData ? programData : null)
  const [preview, setPreview] = useState<ProgramInfo | null>(null)

  useEffect(() => {
    setExercises(exerciseData);
    if(programData){
      setProgram(programData);
      setPreview({
        id: programData.id,
        name: programData.name,
        description: programData.description,
        duration: programData.duration ? programData.duration : 0,
        img: programData.img
      })
      return
    }
    if(!Array.isArray(exerciseData)){
      setPreview({
        id: exerciseData.id,
        name: exerciseData.name,
        description: exerciseData.description,
        duration: exerciseData.duration,
        img: exerciseData.img
      })
      return
    }
    return
  }, [])

  const { description = "Loading...", duration = 0, id = 0, img ='/assets/icon.png', name = "Loading..." } = preview ? preview : {};
  const textColor = "rgba(74, 74, 74, 1)"
  return (
    <View>
      <YStack p="$3">
        <Image source={{ uri: img }} style={{ width: 'fit', height: 300, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
        <YStack backgroundColor={'rgba(196, 176, 113, 0.55)'} borderBottomLeftRadius={10} borderBottomRightRadius={10} p="$3">
          <H2 color={textColor} >{name}</H2>
          <H3 color={textColor} pb="$2">{description}</H3>
          <Paragraph color={"rgba(130, 128, 123, 1)"} style={{fontSize: 15}}>Duration: {duration ? formatTime(duration) : 0}</Paragraph>
        </YStack>
      </YStack>
    </View>
  );
};

export default ExerciseDetailContent;
