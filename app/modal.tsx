import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function Modal() {
  const isPresented = router.canGoBack()

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {
        isPresented && <Link href='../'>dismiss</Link>
      }
      <StatusBar style="light" />
    </View>
  )
}