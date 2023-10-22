import { Alert, StyleSheet, TextInput, TouchableHighlight, useWindowDimensions, Platform, StatusBar, LayoutAnimation, UIManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../../components/Themed';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default function TabTwoScreen() {
  const dimentions = useWindowDimensions()

  const [fade, setFade] = useState(false)

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('red')
  })

  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor='red' onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        setFade((prev) => !prev)
      }}>
        <Text>press</Text>
      </TouchableHighlight>
      {
        fade && (
          <View>
            <Text>appear</Text>
          </View>
        )
      }
      <StatusBar backgroundColor='blue' />
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput onChangeText={(e) => {
        save('test', e)
      }} />
      <TouchableHighlight underlayColor='#ff0' activeOpacity={1} onPress={() => {
        // Alert.alert(SecureStore.getItem('test') ?? '')
      }}>
        <Text>GET STORE</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
