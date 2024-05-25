import React, { useState, useEffect } from 'react';
import { View, H1, Button, YStack, H3 } from 'tamagui';

interface CountdownTimerProps {
  setRemainingDuration: React.Dispatch<React.SetStateAction<number>>;
  remainingDuration: number;
  initialDuration: number;
  onCountDownComplete: () => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setRemainingPrepTime: React.Dispatch<React.SetStateAction<number>>;
  remainingPrepTime: number;
  setPrepTimeOver: React.Dispatch<React.SetStateAction<boolean>>;
  prepTimeOver: boolean
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  setRemainingDuration,
  remainingDuration,
  initialDuration,
  onCountDownComplete,
  isPaused,
  setIsPaused,
  setRemainingPrepTime,
  remainingPrepTime,
  setPrepTimeOver,
  prepTimeOver
}) => {

  useEffect(() => {
    if (prepTimeOver) {
      if (remainingDuration <= 0) {
        onCountDownComplete();
        return;
      }

      if (isPaused) {
        return;
      }

      const intervalId = setInterval(() => {
        setRemainingDuration((prevTime: number) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      const prepIntervalId = setInterval(() => {
        setRemainingPrepTime((prevTime: number) => {
          if (prevTime <= 1) {
            clearInterval(prepIntervalId);
            setPrepTimeOver(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(prepIntervalId);
    }
  }, [prepTimeOver, remainingDuration, onCountDownComplete, isPaused]);

  return (
    <View padding='$4'>
      {!prepTimeOver ? (
        <YStack>
        <H3 color={'#A7D489'} justifyContent='center' alignSelf='center'>GET READY</H3>
        <H1 size={'$13'} alignSelf='center' color={'#A7D489'}>
          {remainingPrepTime}
        </H1>
        </YStack>
      ) : (
        <YStack>
        <H3 color={'#A7D489'} justifyContent='center' alignSelf='center'></H3>
        <H1 size={'$13'} alignSelf='center' color={"rgba(130, 128, 123, 1)"}>
          {remainingDuration}
        </H1>
        </YStack>
      )}
    </View>
  );
};

export default CountdownTimer;
