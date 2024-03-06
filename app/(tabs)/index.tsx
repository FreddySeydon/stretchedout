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
import { queryDatabase, openDatabaseFirst } from '~/utils/db';

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseRows, setExerciseRows] = useState([])

  useEffect(() => {
    const firstOpenDatabase = async () => {
      await openDatabaseFirst();
      await loadDatabase()
    }
    firstOpenDatabase()
  }, []);

  const loadDatabase = async () => {
    setIsLoading(true)
    const resultRows = await queryDatabase('SELECT * FROM exercises;');
    setExerciseRows(resultRows.rows);
    // console.log(resultRows.rows);
    setIsLoading(false)
  };

  return (
	  <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Stretched Out</H2>
        <H3>Exercises</H3>
        <ScrollView horizontal>
        <XStack gap="$3" p="$5">
          {isLoading ? <Spinner /> : 
          exerciseRows.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise}/>
          ))
          }
        </XStack>
        </ScrollView>
        <Separator />
      </YStack>
    </Theme>
  );
}
