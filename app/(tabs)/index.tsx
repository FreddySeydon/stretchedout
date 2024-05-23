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
import SetupNotification from '~/components/SetupNotification';
import * as Notifications from 'expo-notifications';
import { Exercise, ProgramInfo, type QueryResult } from '~/types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseRows, setExerciseRows] = useState<Exercise[]>([])
  const [programRows, setProgramRows] = useState<ProgramInfo[]>([])

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
    const result = await queryDatabase('SELECT * FROM exercises;') as Exercise[];
    setExerciseRows(result);
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
      <YStack flex={1} alignItems="center" justifyContent="center" pt='$6'>
        <H2>StretchOut</H2>
        <SetupNotification />
        <H3 pt='$5'>Programs</H3>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" p="$5" mb="$3" pt='$3' style={{paddingLeft:"5vw", paddingRight:"5vw"}}>
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
        <XStack gap="$3" p="$5" style={{paddingLeft:"5vw", paddingRight:"5vw"}}>
          {isLoading ? <Spinner /> : 
          exerciseRows.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise}/>
          ))
          }
        </XStack>
        </ScrollView>
        <Separator />
      </YStack>
      </ScrollView>
    </Theme>
  );
}
