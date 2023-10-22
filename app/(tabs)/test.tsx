import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, KeyboardAvoidingView, Keyboard, Platform, StatusBar, Animated, InteractionManager, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from 'expo-router';

async function save(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: any) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}


const useMount = (fn) => {
  useEffect(() => fn(), [])
}

const useFadeIn = (duration) => {
  const value = useRef(new Animated.Value(0)).current;

  useMount(() => {
    Animated.timing(value, {
      useNativeDriver: true,
      toValue: 1,
      duration,
    }).start()
  })

  return value
}

const Ball = ({ onShown }) => {
  const opacity = useFadeIn(5000)

  useMount(() => {
    const interractionPromise = InteractionManager.runAfterInteractions(onShown)

    return () => {
      interractionPromise.cancel()
    }
  })

  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: "salmon",
        borderRadius: 100,
        opacity,
      }}
    />
  )
}

export default function App() {
  const [key, onChangeKey] = useState('Your key here');
  const [value, onChangeValue] = useState('Your value here');

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('blue')
  })

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
      { }

      <TextInput
        style={styles.textInput}
        keyboardType='number-pad'
        clearTextOnFocus
        onChangeText={text => onChangeKey(text)}
        onBlur={() => {
          Keyboard.dismiss()
        }}
        value={key}
      />
      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={text => onChangeValue(text)}
        value={value}
      />
      { }
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          onChangeKey('Your key here');
          onChangeValue('Your value here');
        }}
      />
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={event => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      />
      <StatusBar backgroundColor='red' />
      <Ball onShown={() => Alert.alert("Animation is done")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 4,
  },
});
