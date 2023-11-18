import React, { useRef } from 'react';
import { Animated, Text, TouchableHighlight, View } from 'react-native';

export default function animation() {
  const position = useRef(new Animated.Value(0)).current

  const moveToRight = () => {
    Animated.timing(position, {
      toValue: 100,
      useNativeDriver: true,
      duration: 1000
    }).start()
  }

  const moveToLeft = () => {
    Animated.timing(position, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1000
    }).start()
  }

  return (
    <View>
      <TouchableHighlight onPress={moveToRight}>
        <Text>to right</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={moveToLeft}>
        <Text>to left</Text>
      </TouchableHighlight>
      <Animated.View
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'red',
          transform: [{
            translateX: position
          }]
        }}
      />
    </View>
  )
}
