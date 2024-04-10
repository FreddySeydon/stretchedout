import { blue } from '@tamagui/themes';
import React from 'react';
import { Text, View, Spinner, Image, H2, H3, YStack, Paragraph } from 'tamagui';
import { OneExercise, Exercise, Programs, OneProgram } from '~/types';

type ExerciseData = {
  insertId?: number;
  rows?: OneExercise[];
  exerciseData: OneExercise | OneProgram;
  rowsAffected?: number;
}

const ExerciseDetailContent = ({ exerciseData }: ExerciseData) => {
  const { description, duration, id, img, name } = exerciseData;
  const textColor = "rgba(74, 74, 74, 1)"
  return (
    <View>
      <YStack p="$3">
        <Image source={{ uri: img }} style={{ width: 'fit', height: 300, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
        <YStack backgroundColor={'rgba(196, 176, 113, 0.55)'} borderBottomLeftRadius={10} borderBottomRightRadius={10} p="$3">
          <H2 color={textColor} >{name}</H2>
          <H3 color={textColor} pb="$2">{description}</H3>
          <Paragraph color={"rgba(130, 128, 123, 1)"} style={{fontSize: 15}}>Duration: {duration} seconds</Paragraph>
        </YStack>
      </YStack>
    </View>
  );
};

export default ExerciseDetailContent;
