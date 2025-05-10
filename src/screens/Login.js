import * as React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const logo = require('../assets/logo.png');

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLOgin = async () => {
    try {
      const response = await axios.post(
        'http://192.168.43.6/api-test/api_login.php',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.status === 'success') {
        console.log('berhasil broo!!!');
        console.log(response.data.user.id);
        await AsyncStorage.setItem('userId', response.data.user.id.toString());
        navigation.replace('MyTabs');
      } else {
        console.error('gagal broo karena:', response.data.message);
        Alert.alert(response?.data?.message || 'Gagal Login');
      }
    } catch (error) {
      console.error('Error posting recipe:', error);
      Alert.alert(error.response.data.message || 'Gagal Login');
    }
  };

  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <Image
        source={logo}
        style={{
          marginBottom: 35,
          marginLeft: 115,
          width: 140,
          height: 140,
        }}
      />
      <Text
        style={{
          flex: 0.1,
          width: '100%',
          textAlign: 'center',
          fontSize: 23,
          fontWeight: 'bold',
        }}>
        HOTEL FINDER
      </Text>
      <TextInput
        placeholder="Masukkan Email"
        onChangeText={text => setEmail(text)}
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 20,
        }}></TextInput>

      <TextInput
        placeholder="Masukkan Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPassword}
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 20,
        }}></TextInput>

      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Text>Belum Punya Akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'blue'}}> REGISTER</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleLOgin()}
        style={{height: 10, marginBottom: 150, marginHorizontal: 20}}>
        <Text
          style={{
            width: '100%',
            height: '40',
            textAlign: 'center',
            textAlignVertical: 'center',
            backgroundColor: '#ADD8E6',
            borderRadius: 20,
            marginBottom: 130,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
