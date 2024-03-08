import React, {useState, useEffect} from 'react'
import { View, H1 } from 'tamagui'

const CountdownTimer = ({setRemainingDuration, remainingDuration, initialDuration, onCountDownComplete}) => {
    const [remainingTime, setRemainingTime] = useState(initialDuration);

    useEffect(() => {
        if(remainingDuration <= 0) {
            onCountDownComplete();
            return
        }

        // setRemainingDuration(initialDuration);

        const intervalId = setInterval(() => {
            setRemainingDuration((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            })
        }, 1000)
        return () => clearInterval(intervalId);
    }, [remainingDuration, onCountDownComplete, initialDuration])

  return (
    <View padding='$4'>
        <H1 size={'$13'} alignSelf='center' color={'black'}>{remainingDuration}</H1>
    </View>
  )
}

export default CountdownTimer
