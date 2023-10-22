import { ScrollView, StatusBar, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Animated, AppState, Alert, Appearance, useColorScheme } from 'react-native'

export default function TabOneScreen() {
  const curState = useRef(AppState.currentState);

  const theme = useColorScheme()

  const [list, setList] = useState<any[]>([])

  const posL = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if ((curState.current === 'inactive' || curState.current === 'background') && state === 'active') {
        Alert.alert(theme)
        Alert.alert('focus')
      }
      curState.current = state
    })
    return () => {
      sub.remove()
    }
  }, [theme])

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('black')
  })

  const moveLeft = () => {
    Animated.timing(posL, {
      toValue: 100,
      useNativeDriver: true,
      duration: 1500,
    }).start()
  }

  const moveRight = () => {
    Animated.timing(posL, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1500,
    }).start()
  }



  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{
        width: 100,
        height: 50,
        backgroundColor: 'red',
        // position: 'absolute',
        // left: 0,
        // right: 0,
        transform: [
          {
            translateX: posL
          }
        ]
      }} />
      <Text style={styles.title} onPress={() => {
        moveLeft()
      }}>Tab One</Text>
      <Text style={styles.title} onPress={() => {
        moveRight()
      }}>Tab One 1</Text>
      {
        list.map((item) => {
          return (
            <View key={item.id}>
              <Text>{item.name}</Text>
            </View>
          )
        })
      }
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href='/(drawers)/home'>drawers</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
