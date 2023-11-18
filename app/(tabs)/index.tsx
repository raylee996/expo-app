import { BackHandler, Button, LayoutAnimation, Linking, PixelRatio, Platform, ScrollView, Share, StatusBar, StyleSheet, TouchableHighlight, TouchableOpacity, Vibration, useWindowDimensions } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Animated, AppState, Alert, Appearance, useColorScheme } from 'react-native'

const supportedURL = 'http://www.baidu.com';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

function getImageSize({ width, height }) {
  const realWidth = PixelRatio.getPixelSizeForLayoutSize(width);
  const realHeight = PixelRatio.getPixelSizeForLayoutSize(height);
  return {
    width: realWidth,
    height: realHeight,
  }
}

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
];

export default function TabOneScreen() {
  const curState = useRef(AppState.currentState);

  const theme = useColorScheme()

  const dimention = useWindowDimensions()

  const [list, setList] = useState<any[]>([])
  const [flag, setFlag] = useState(false)

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setFlag(true)
  }

  const moveRight = () => {
    Animated.timing(posL, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1500,
    }).start()
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setFlag(false)
  }

  const backHandler = () => {
    Alert.alert('hold on', 'want to go back', [
      {
        text: 'cancel',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'ok',
        style: 'default',
        onPress: () => {
          BackHandler.exitApp()
        }
      }
    ])
    return true
  }

  BackHandler.addEventListener('hardwareBackPress', backHandler)

  const reqPerm = () => {
    try {

    } catch {

    }
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
      {
        flag && (
          <View onStartShouldSetResponder={(e) => true} onMoveShouldSetResponder={(e) => true} >
            <Text>123456</Text>
          </View>
        )
      }
      <Link href='/(drawers)/home'>drawers</Link>

      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>

      <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => {
        Alert.alert(`${PixelRatio.getFontScale()}`)
      }}>
        <Text>show fontscale</Text>
      </TouchableHighlight>

      <TouchableOpacity onPress={() => {
        Alert.alert(`${Platform.Version}`)
      }} style={{
        backgroundColor: '#ddd'
      }}>
        <Text>show os version</Text>
      </TouchableOpacity>

      <Button onPress={async () => {
        try {
          const res = await Share.share({
            message: 'share react native app'
          })
          if (res.action === Share.sharedAction) {
            if (res.activityType) {
              // shared with activity type of result.activityType
              Alert.alert(res.activityType)
            } else {
              // shared
              Alert.alert('shared')
            }
          } else if (res.action === Share.dismissedAction) {
            // dismissed
            Alert.alert('dismiss')
          }
        } catch (error) {
          Alert.alert(error.message)
        }
      }} title='share' />
      <Button title='vibration' onPress={() => {
        Vibration.vibrate(PATTERN, false)
      }} />
      <Button title='cancel vibration' onPress={() => {
        Vibration.cancel()
      }} />
      <Text>
        theme: {theme}
      </Text>
      <View>
        <Text>{dimention.width}</Text>
      </View>
      <View>
        <Text>{dimention.height}</Text>
      </View>
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
