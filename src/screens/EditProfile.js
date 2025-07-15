import React, {useEffect, useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';

const BackIcon = require('./../assets/back.png');
const BlindIcon = require('./../assets/Blind.png');
const EyeIcon = require('./../assets/eye.png');
const ProfileIcon = require('./../assets/Profil.png');

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
  const [imageUri, setImageUri] = useState(
    `http://192.168.43.6/api-test/${userData.foto}`,
  );
  const [imageName, setImageName] = useState(null);

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

  const handleChoosePhoto = () => {
    
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal memilih gambar. Coba lagi.');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImageUri(asset.uri);
        setImageName(asset.fileName || 'profile.jpg'); // fallback jika fileName tidak ada
      }
    });
  };

  const handleSave = async () => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 6 || !hasUpperCase || !hasNumber) {
      Alert.alert('Validasi Gagal', errorPassword);
      return;
    }


    const formData = new FormData();
    formData.append('id', userData.id);
    formData.append('nama', nama);
    formData.append('alamat', alamat);
    formData.append('jenis_kelamin', jenis_kelamin);
    formData.append('no_hp', noHp);
    formData.append('email', email);
    formData.append('password', password);
    if (imageUri && imageName) {
      formData.append('foto', {
        uri: imageUri,
        type: 'image/jpeg',
        name: imageName,
      });
    }

    try {
      const response = await axios.post(
        'http://192.168.43.6/api-test/api_edit.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 'success') {
        Alert.alert('Berhasil', 'Profil berhasil diperbarui');
        navigation.goBack();
      } else {
        Alert.alert(
          'Gagal',
          response.data.message || 'Gagal memperbarui profil',
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Sedang menyimpan', ' Tunggu sebentar...');
    } 
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={{alignItems: 'center', margin: 30}}>
          <Image
            key={imageUri}
            source={imageUri ? {uri: imageUri} : ProfileIcon}
            style={{
              height: 125,
              width: 125,
              borderRadius: 65,
              borderWidth: 2,
              borderColor: '#ddd',
            }}
          />
        </TouchableOpacity>

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
  header: {
    backgroundColor: '#efefef',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  backIcon: {
    height: 30,
    width: 25,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
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
