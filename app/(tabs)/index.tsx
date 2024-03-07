import React, { useEffect, useState } from 'react';
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
  Spinner
} from 'tamagui';
import ExerciseCard from '~/components/ExerciseCard';
import ProgramCard from '~/components/ProgramCard';
import { queryDatabase, openDatabaseFirst, getAllPrograms } from '~/utils/db';

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseRows, setExerciseRows] = useState([])
  const [programRows, setProgramRows] = useState([])

  useEffect(() => {
    const firstOpenDatabase = async () => {
      await openDatabaseFirst();
      await loadExercises()
      await loadPrograms()
    }
    firstOpenDatabase()
  }, []);

  const loadExercises = async () => {
    setIsLoading(true)
    const resultRows = await queryDatabase('SELECT * FROM exercises;');
    setExerciseRows(resultRows.rows);
    // console.log(resultRows.rows);
    setIsLoading(false)
  };

  const loadPrograms = async () => {
    setIsLoading(true)
    const resultRows = await getAllPrograms();
    setProgramRows(resultRows);
    setIsLoading(false)
  };

  return (
	  <Theme name="light">
      <ScrollView>
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Stretched Out</H2>
        <H3>Programs</H3>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" p="$5">
          {isLoading ? <Spinner /> : 
          programRows.map((program) => (
            <ProgramCard key={program.id} program={program}/>
          ))
          }
        </XStack>
        </ScrollView>
        <Separator marginVertical={15} />
        <H3>Exercises</H3>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" p="$5">
          {isLoading ? <Spinner /> : 
          exerciseRows.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise}/>
          ))
          }
        </XStack>
        </ScrollView>
        <Separator />
        {/* <Button onPress={loadPrograms}>Load Programs</Button> */}
      </YStack>
      </ScrollView>
    </Theme>
  );
}
