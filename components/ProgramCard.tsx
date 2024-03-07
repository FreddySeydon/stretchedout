import React, {useEffect, useState} from 'react'
import {
    XStack,
    YStack,
    H2,
    H3,
    Separator,
    Theme,
    Card,
    ScrollView,
    Image,
    Paragraph,
    Button,
    View,
    Text,
  } from 'tamagui';
  import { Link, router } from 'expo-router';
  import { getOneProgramDuration } from '~/utils/db';

  type Exercise = {
    description: string;
    duration: number;
    id: number;
    img: string;
    name: string;
  };
  
  type ExerciseData = {
    insertId: number;
    rows: Exercise[];
    rowsAffected: number;
  };

  type Program = {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  interface ProgramWithExercises {
    program_id: number;
    program_name: string;
    exercises: Exercise[];
  }

  type ExerciseCardProps =  {
    exercise: Exercise;
  }

const ProgramCard = ({program}: Program) => {
  const {id, name, description, img, program_duration} = program
  console.log(id, name, description, program_duration)

  //  const goToExercise = () => {
  //   router.push(`/programs/${id}`)
  //  }

  return (
    <View>
        <Card elevate m="$0" width={300} height={380} scale={0.9} hoverStyle={{scale: 0.925}} pressStyle={{scale: 0.975}} >
            <Card.Header m={0} p={0}>
                {/* {exercises.map((exercise : Exercise) => (
                <Image source={{width: 50, height: 50, uri: exercise.img}} style={{margin: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
                ))} */}
                <Image source={{width: 300, height: 300, uri: img}} style={{margin: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
                </Card.Header>
            <Card.Footer>
                <YStack  margin="$3" paddingTop="$10">
                    <H2 color={'rgba(74, 74, 74, 1)'} paddingTop="$10">
                        {name}
                    </H2>
                    <Paragraph theme={'alt2_Card'}>
                        Duration: {program_duration} seconds
                    </Paragraph>
                    {/* <Button onPress={getDuration}>Get duration</Button> */}
                </YStack>
            </Card.Footer>
        </Card>
      </ View>
  )
}

export default ProgramCard
