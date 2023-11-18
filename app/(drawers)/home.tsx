import { useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import { AppState } from 'react-native'
import { View, Text } from 'react-native'

export default function DrawerIndex() {
  const state = useRef(AppState.currentState)

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active' && (state.current === 'inactive' || state.current === 'background')) {
        Alert.alert('focus')
      }
      state.current = nextState
    })
    return () => {
      sub.remove()
    }
  }, [])

  return (
    <View>
      <Text>index</Text>
    </View>
  )
}