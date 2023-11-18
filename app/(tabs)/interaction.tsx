import React, { useEffect } from 'react';
import { InteractionManager, View, Text, Alert } from 'react-native'

const useMount = (fn) => {
  useEffect(() => {
    fn()
  }, [])
}

const useInteraction = (timeout = 8000) => {
  useMount(() => {
    const handle = InteractionManager.createInteractionHandle()

    setTimeout(() => {
      InteractionManager.clearInteractionHandle(handle)
    }, timeout)

    return () => {
      InteractionManager.clearInteractionHandle(handle)
    }
  })
}

const Ball = ({ done }) => {
  useInteraction()

  useMount(() => {
    InteractionManager.runAfterInteractions(() => {
      done()
    })
  })

  return (
    <View>
      <Text>
        ball
      </Text>
    </View>
  )
}

export default function Interaction() {
  return (
    <Ball done={() => {
      Alert.alert("Interaction is done")
    }} />
  )
}
