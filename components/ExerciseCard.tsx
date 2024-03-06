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
  import { Link } from 'expo-router';

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
//    console.log("Image Path:", img, typeof(img))
//    const requImage = require(img);
  return (
      <Link href={`/exercises/${id}`}>
        <Card elevate m="$10" width={300} height={360} scale={0.9} hoverStyle={{scale: 0.925}} pressStyle={{scale: 0.975}}>
            <Card.Header >
                <Image source={{width: 300, height: 300, uri: img}} /></Card.Header>
            <Card.Footer>
                <YStack p={10}>
                    <H2 fontSize={20} color={'lightblue'}>
                        {name}
                    </H2>
                    <Paragraph theme={'alt2_Card'}>
                        {duration}
                    </Paragraph>
                </YStack>
            </Card.Footer>
        </Card>
      </Link>
  )
}

export default ExerciseCard
