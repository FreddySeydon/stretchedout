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
  import { type ProgramInfo, type Exercise } from '~/types';
  import { formatTime } from '~/utils/utils';

  type Program = {
    program: ProgramInfo;
  }

const ProgramCard = ({program}: Program) => {
  const {id, name, description, img, duration} = program

   const goToProgram = () => {
    router.push(`/programs/${id}`)
   }

  return (
    <View>
        <Card elevate m="$0" width={300} height={380} pressStyle={{scale: 0.975}} onPress={goToProgram} >
            <Card.Header m={0} p={0}>
                <Image source={{width: 300, height: 300, uri: img}} style={{margin: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10}} />
                </Card.Header>
            <Card.Footer>
                <YStack  margin="$3" paddingTop="$10">
                    <H2 color={'rgba(74, 74, 74, 1)'} paddingTop="$10">
                        {name}
                    </H2>
                    <Paragraph theme={'alt2_Card'}>
                        Duration: {duration ? formatTime(duration) : 0}
                    </Paragraph>
                </YStack>
            </Card.Footer>
        </Card>
      </ View>
  )
}

export default ProgramCard
