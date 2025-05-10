import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
const BackIcon = require('./../assets/back.png');
const BlindIcon = require('./../assets/Blind.png');
const EyeIcon = require('./../assets/eye.png');

function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData} = route.params;

  const [nama, setNama] = useState(userData.nama);
  const [alamat, setAlamat] = useState(userData.alamat);
  const [jenis_kelamin, setJenisKelamin] = useState(userData.jenis_kelamin);
  const [noHp, setNoHp] = useState(userData.no_hp);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(emailRegex.test(text) ? '' : 'Format email tidak valid');
  };

  const handlePasswordChange = text => {
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

  const handleSave = async () => {
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
          no_hp: noHp,
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
    <View style={{backgroundColor: '#fff', flex: 1, marginBottom: -60}}>
      <View style={{backgroundColor: '#efefef'}}>
        <TouchableOpacity
          style={{height: 60, padding: 7}}
          onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={{height: 50, width: 40}} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nama</Text>
        <TextInput style={styles.input} value={nama} onChangeText={setNama} />

        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={styles.input}
          value={alamat}
          onChangeText={setAlamat}
        />

        <Text style={styles.label}>Jenis Kelamin</Text>
        <View style={{gap: 5, marginTop: 5}}>
          <TouchableOpacity
            onPress={() => setJenisKelamin('Pria')}
            style={{flexDirection: 'row', gap: 10}}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: jenis_kelamin === 'Pria' ? '#ADD8E6' : 'white',
                borderRadius: 20,
                borderWidth: 1.5,
              }}
            />
            <Text>Pria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setJenisKelamin('Wanita')}
            style={{flexDirection: 'row', gap: 10}}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor:
                  jenis_kelamin === 'Wanita' ? '#ADD8E6' : 'white',
                borderRadius: 20,
                borderWidth: 1.5,
              }}
            />
            <Text>Wanita</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>No HP</Text>
        <TextInput
          style={styles.input}
          value={noHp}
          onChangeText={setNoHp}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
        />
        {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputPass, {flex: 1}]}
            placeholder="Masukkan password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              style={styles.eyeIcon}
              source={passwordVisible ? BlindIcon : EyeIcon}
            />
          </TouchableOpacity>
        </View>
        {errorPassword ? (
          <Text style={styles.errorText}>{errorPassword}</Text>
        ) : null}

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  inputPass: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#63A2B0',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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

export default EditProfile;
