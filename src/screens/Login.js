import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text
        style={{
          flex: 0.1,
          width: '100%',
          textAlign: 'center',
          fontSize: 23,
          fontWeight: 'bold',
        }}>
        NAMA APLIKASI
      </Text>
      <TextInput
        placeholder="Masukkan Username"
        style={{
          borderBottomWidth: 1,
        }}></TextInput>

      <TextInput
        placeholder="Masukkan Password"
        style={{
          borderBottomWidth: 1,
        }}></TextInput>

      <TouchableOpacity onPress={() => navigation.replace('MyTabs')}>
        <Text
          style={{
            width: '100%',
            height: '40',
            textAlign: 'center',
            textAlignVertical: 'center',
            backgroundColor: '#009990',
            borderRadius: 20,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
