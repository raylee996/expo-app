import React, { useEffect } from 'react';
import { Alert, InteractionManager, Text, View } from 'react-native'

function Ball() {
  useEffect(() => {
    const interval = setInterval(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        Alert.alert('title')
      })
      Alert.alert('title')

      interaction.cancel()
    }, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View>
      <Text>
        ball
      </Text>
    </View>
  )
}

export default function interaction() {
  return (
    <Ball />
  )
}
