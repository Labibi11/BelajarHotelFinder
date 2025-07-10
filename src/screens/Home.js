import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
const kamar = require('./../assets/kamar.jpg');

function Home() {
  const navigation = useNavigation();

  const [penginapan, setPenginapan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenginapan = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.43.6/api-test/api_penginapan.php?user_id=${userId}`,
        );
        setPenginapan(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching penginapan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPenginapan();
  }, []);
  
  const [userLat, setUserLat] = useState(0);
  const [userLong, setUserLong] = useState(0);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setUserLat(info.coords.latitude);
      setUserLong(info.coords.longitude);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getDistance = (lat1Deg, lon1Deg, lat2Deg, lon2Deg) => {
    const toRad = degree => {
      return (degree * Math.PI) / 180;
    };

    const lat1 = toRad(lat1Deg);
    const lon1 = toRad(lon1Deg);
    const lat2 = toRad(lat2Deg);
    const lon2 = toRad(lon2Deg);

    const {sin, cos, sqrt, atan2} = Math;

    const R = 6371;
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      sin(dLat / 2) * sin(dLat / 2) +
      cos(lat1) * cos(lat2) * sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));
    const d = R * c;
    return d;
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#efefef'}}>
      <ImageHeader />
      {/* tombol mulai mencari */}
      <TouchableOpacity
        style={{
          backgroundColor: '#074799',
          marginHorizontal: 130,
          marginTop: 15,
          padding: 15,
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate('Pencarian')}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
          }}>
          Mulai Mencari
        </Text>
      </TouchableOpacity>

      {/* daftar hotel */}
      <View style={{margin: 20, borderBottomWidth: 1}}>
        <Text style={{fontSize: 18}}>Explore</Text>
      </View>
      {penginapan?.slice(0, 4).map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                dataPenginapan: item,
              })
            }
            key={index}
            style={{
              marginBottom: 20,
              marginHorizontal: 20,
              backgroundColor: 'white',
              flexDirection: 'row',
              padding: 10,
              borderRadius: 20,
            }}>
            <View>
              <Image
                source={{
                  uri: 'http://192.168.43.6/api-test/admin/' + item.foto,
                }}
                style={{width: 100, height: 100, borderRadius: 20}}
              />
            </View>
            <View style={{marginLeft: 20, width: '60%'}}>
              <Text numberOfLines={1} style={{fontSize: 17}}>
                {item.nama}
              </Text>
              <Text numberOfLines={1} style={{fontSize: 17}}>
                {item.alamat}
              </Text>
              <Text numberOfLines={1} style={{fontSize: 17}}>
                {getDistance(userLat, userLong, item.lat, item.lng).toFixed(1)}{' '}
                km
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default Home;
