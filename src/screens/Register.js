import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
const BlindIcon = require('./../assets/Blind.png');
const EyeIcon = require('./../assets/eye.png');

function Register() {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [gender, setGender] = useState('');
  const [no_hp, setNo_hp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');

  const navigation = useNavigation();

  const [errorEmail, setErrorEmail] = useState('');

  const handleEmail = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(emailRegex.test(text) ? '' : 'Format email tidak valid');
  };

  const handlePassword = text => {
    const hasUpperCase = /[A-Z]/.test(text);
    const hasNumber = /[0-9]/.test(text);

    setPassword(text);
    if (text.length < 6) {
      setErrorPassword('Password harus minimal 6 karakter');
    } else if (!hasUpperCase) {
      setErrorPassword('Password harus mengandung minimal 1 huruf besar');
    } else if (!hasNumber) {
      setErrorPassword('Password harus mengandung minimal 1 angka');
    } else {
      setErrorPassword('');
    }
  };

  const handleRegister = async () => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 6) {
      Alert.alert('Validasi Gagal', 'Password harus minimal 6 karakter');
      return;
    } else if (!hasUpperCase) {
      Alert.alert(
        'Validasi Gagal',
        'Password harus mengandung minimal 1 huruf besar',
      );
      return;
    } else if (!hasNumber) {
      Alert.alert(
        'Validasi Gagal',
        'Password harus mengandung minimal 1 angka',
      );
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.43.6/api-test/api_edit.php',
        {
          id: userData.id,
          nama: nama,
          alamat: alamat,
          jenis_kelamin: jenis_kelamin,
          no_hp: no_hp,
          email: email,
          password: password,
        },
      );

      if (response.data.status === 'success') {
        Alert.alert('Berhasil', 'Profil berhasil diperbarui');
        navigation.goBack();
      } else {
        Alert.alert('Gagal', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menghubungi server');
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <Text style={styles.header}>WELCOME</Text>

      <TextInput
        placeholder="Masukkan Nama"
        onChangeText={text => setNama(text)}
        style={styles.textInput}></TextInput>

      <TextInput
        placeholder="Masukkan Alamat"
        onChangeText={text => setAlamat(text)}
        style={styles.textInput}></TextInput>

      <Text>Jenis Kelamin:</Text>
      <View style={{gap: 5, marginTop: 5}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => setGender('Pria')}
            style={{
              height: 20,
              width: 20,
              backgroundColor: gender === 'Pria' ? '#ADD8E6' : 'white',
              borderRadius: 20,
              borderWidth: 1.5,
            }}></TouchableOpacity>
          <Text>Pria</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => setGender('Wanita')}
            style={{
              height: 20,
              width: 20,
              backgroundColor: gender === 'Wanita' ? '#ADD8E6' : 'white',
              borderRadius: 20,
              borderWidth: 1.5,
            }}></TouchableOpacity>
          <Text>Wanita</Text>
        </View>
      </View>

      <TextInput
        placeholder="Masukkan No Hp"
        onChangeText={text => setNo_hp(text)}
        style={styles.textInput}
        keyboardType="numeric"></TextInput>

      <TextInput
        placeholder="Masukkan Email"
        style={styles.textInput}
        value={email}
        onChangeText={handleEmail}
      />
      {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.textInputpass, {flex: 1}]}
          placeholder="Masukkan password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={handlePassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            style={styles.eyeIcon}
            source={passwordVisible ? BlindIcon : EyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errorPassword ? (
        <Text style={styles.errorText}>{errorPassword}</Text>
      ) : null}

      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Text>Sudah Punya Akun?</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{color: 'blue'}}> LOGIN</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleRegister()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '40',
          marginTop: '20',
          backgroundColor: '#ADD8E6',
          borderRadius: 20,
        }}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {borderBottomWidth: 1, marginVertical: 10},
  textInputpass: {borderBottomWidth: 1, marginVertical: 10},
  header: {
    fontSize: 25,
    fontFamily: 'bold',
    textAlign: 'center',
    marginVertical: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginTop: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    tintColor: '#888',
  },
});

export default Register;
