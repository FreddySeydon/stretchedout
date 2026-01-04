import React from 'react'
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

  type ExerciseCardProps =  {
    exercise: Exercise;
  }

const ExerciseCard = ({exercise}: ExerciseCardProps) => {
   const {description, duration, id, img, name} = exercise

   const goToExercise = () => {
    router.push(`/exercises/${id}`)
   }

  return (
    <View>
        <Card elevate m="$0" width={300} height={380} scale={0.9} hoverStyle={{scale: 0.925}} pressStyle={{scale: 0.975}} onPress={goToExercise}>
            <Card.Header m={0} p={0}>
                <Image source={{width: 300, height: 300, uri: img}} style={{margin: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
                </Card.Header>
            <Card.Footer>
                <YStack padding="$3">
                    <H2 color={'rgba(74, 74, 74, 1)'}>
                        {name}
                    </H2>
                    <Paragraph theme={'alt2_Card'}>
                        Duration: {duration} seconds
                    </Paragraph>
                </YStack>
            </Card.Footer>
        </Card>
      </ View>
  )
}

export default ExerciseCard
