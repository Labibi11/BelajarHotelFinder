import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
const ProfileIcon = require('./../assets/Profil.png');

function Profile() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `http://192.168.43.6/api-test/api_user.php?id=${userId}`,
      );
      setUserData(response.data.data);
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile(userId);

      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
      <View
        style={{
          backgroundColor: '#63A2B0',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 25,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Profile
        </Text>
        <View style={{alignItems: 'center', margin: 30}}>
          <Image
            source={ProfileIcon}
            style={{height: 125, width: 125, tintColor: 'white'}}
          />
        </View>

        <View style={{position: 'absolute', top: 20, right: 5}}>
          <TouchableOpacity
            style={{width: 30, height: 100}}
            onPress={() => {
              Alert.alert(
                'Menu Profil',
                'Silakan dipilih.',
                [
                  {
                    text: 'Edit Profile',
                    onPress: () => {
                      if (userData) {
                        navigation.navigate('EditProfile', {userData});
                      }
                    },
                  },
                  {
                    text: 'Logout',
                    onPress: () => {
                      Alert.alert(
                        'Konfirmasi Logout',
                        'Apakah Anda yakin ingin logout?',
                        [
                          {
                            text: 'Tidak',
                            style: 'cancel',
                          },
                          {
                            text: 'Ya',
                            onPress: async () => {
                              await AsyncStorage.removeItem('userId');
                              navigation.reset({
                                index: 0,
                                routes: [{name: 'Login'}],
                              });
                            },
                          },
                        ],
                        {cancelable: true},
                      );
                    },
                    style: 'destructive',
                  },
                  {
                    text: 'Batal',
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            }}>
            <Text style={{fontSize: 25, color: 'white'}}>⋮</Text>
            {/* Simbol menu 3 titik */}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            width: '90%',
          }}>
          <Text style={{fontSize: 17}}>NAMA</Text>
          <Text
            numberOfLines={1}
            style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            {userData?.nama}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            width: '90%',
          }}>
          <Text style={{fontSize: 17}}>ALAMAT</Text>
          <Text
            numberOfLines={1}
            style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            {userData?.alamat}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            width: '90%',
          }}>
          <Text style={{fontSize: 17}}>JENIS KELAMIN</Text>
          <Text
            numberOfLines={1}
            style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            {userData?.jenis_kelamin}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            width: '90%',
          }}>
          <Text style={{fontSize: 17}}>NO HP</Text>
          <Text
            numberOfLines={1}
            style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            {userData?.no_hp}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            width: '90%',
          }}>
          <Text style={{fontSize: 17}}>EMAIL</Text>
          <Text
            numberOfLines={1}
            style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            {userData?.email}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
