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
} from 'tamagui';
import { TouchableOpacity, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { queryDatabase, openDatabaseFirst } from '~/utils/db';

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const armCircles = require("assets/illustrations/arm-circles.jpg")

  useEffect(() => {
    openDatabaseFirst();
  }, []);

  const loadDatabase = () => {
    queryDatabase('SELECT * FROM exercises;');
  };

  return (
	  <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Stretched Out</H2>
        <H3>Exercises</H3>
        <XStack>
          <Card elevate size="$10" bordered marginLeft="$10">
            <Card.Header>
              <H2>Arm Circles</H2>
              <Paragraph theme="alt2">1 Minute</Paragraph>
            </Card.Header>
            <Card.Footer padded>
              <XStack flex={1} />
              <Button borderRadius="$10">Start now</Button>
            </Card.Footer>
            <Card.Background>
              <Image
                resizeMode="contain"
                alignSelf="center"
                source={{
                  width: 300,
                  height: 300,
				  uri: require("assets/illustrations/butterfly-stretch.jpg")
                }}
              />
            </Card.Background>
          </Card>
          <Card>
            <Card.Header />
            <H2>Catfaces</H2>
            <Card.Footer />
            <Card.Background />
          </Card>
        </XStack>
        <TouchableOpacity onPress={loadDatabase}>
          <Text>Load Database</Text>
        </TouchableOpacity>
        <Separator />
      </YStack>
    </Theme>
  );
}
