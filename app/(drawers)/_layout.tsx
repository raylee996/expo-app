import { Drawer } from 'expo-router/drawer'

export default function DrawersLayout() {
  return (
    <Drawer>
      <Drawer.Screen name='home' />
    </Drawer>
  )
}