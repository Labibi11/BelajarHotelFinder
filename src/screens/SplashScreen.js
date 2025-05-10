import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';

function SplashScreen({navigation}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const checkUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        navigation.replace('MyTabs');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error retrieving data', error);
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.5,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      checkUserId();
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
      }}>
      <Animated.Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: '#EFBC5D',
          textAlign: 'center',
          transform: [{scale: scaleAnim}],
        }}>
        Hotel<Text style={{color: '#ADD8E6'}}>Finder</Text>
      </Animated.Text>
    </View>
  );
}

export default SplashScreen;
