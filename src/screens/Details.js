import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const BackIcon = require('./../assets/back.png');
const kamar = require('./../assets/kamar.jpg');
const favorit = require('./../assets/Favorite.png');
const favoritrRed = require('./../assets/favoriteRed.png');
const locationIcon = require('./../assets/location.png');
const distanceIcon = require('./../assets/distance.png');
const emailIcon = require('./../assets/email.png');
const phoneIcon = require('./../assets/phone.png');
const moneyIcon = require('./../assets/money.png');

function Details({route}) {
  const navigation = useNavigation();
  const {dataPenginapan} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const userId = await AsyncStorage.getItem('userId');
      try {
        const res = await axios.get(
          `http://192.168.43.6/api-test/api_favorite.php?user_id=${userId}`,
        );
        const favorites = res.data.data.map(fav => fav.penginapan.id);
        if (favorites.includes(dataPenginapan.id)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.log('Failed to check favorite:', err);
      }
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    const userId = await AsyncStorage.getItem('userId');

    if (!isFavorite) {
      // Tambah ke favorite
      try {
        await axios.post('http://192.168.43.6/api-test/api_favorite.php', {
          user_id: userId,
          penginapan_id: dataPenginapan.id,
        });
        setIsFavorite(true);
        alert('Ditambahkan ke favorit!');
      } catch (err) {
        console.log('Gagal menambahkan:', err);
      }
    } else {
      // Hapus dari favorite
      try {
        await axios.delete('http://192.168.43.6/api-test/api_favorite.php', {
          data: {
            user_id: userId,
            penginapan_id: dataPenginapan.id,
          },
        });

        setIsFavorite(false);
        alert('Dihapus dari favorit!');
      } catch (err) {
        console.log('Gagal menghapus:', err);
      }
    }
  };

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

  useEffect(() => {
    if (userLat && userLong && dataPenginapan.length > 0) {
      const sorted = [...dataPenginapan].sort((a, b) => {
        const distanceA = getDistance(
          userLat,
          userLong,
          Number(a.lat),
          Number(a.lng),
        );
        const distanceB = getDistance(
          userLat,
          userLong,
          Number(b.lat),
          Number(b.lng),
        );
        return distanceA - distanceB;
      });
      setFilteredPenginapan(sorted);
    }
  }, [userLat, userLong, dataPenginapan]);

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
    <View>
      <TouchableOpacity
        style={{
          height: 60,
          padding: 7,
        }}
        onPress={() => navigation.goBack()}>
        <Image source={BackIcon} style={{height: 50, width: 40}} />
      </TouchableOpacity>
      <ScrollView style={{backgroundColor: '#efefef'}}>
        <Image
          source={{
            uri: 'http://192.168.43.6/api-test/admin/' + dataPenginapan.foto,
          }}
          style={{
            width: '100%',
            height: 250,
          }}
        />
        <View style={{marginHorizontal: 15, marginTop: 7}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginRight: 20,
            }}>
            <Text style={{fontSize: 22, margin: 5}}>{dataPenginapan.nama}</Text>
            <TouchableOpacity
              style={{marginTop: 15, marginBottom: 5}}
              onPress={toggleFavorite}>
              <Image
                source={isFavorite ? favoritrRed : favorit}
                style={{height: 33, width: 33}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', gap: 20, marginLeft: 10}}>
            <Image
              source={locationIcon}
              style={{width: 27, height: 27, marginTop: 7}}
            />
            <Text
              style={{
                fontSize: 17,
                marginTop: 5,
              }}>
              {dataPenginapan.alamat}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20, marginLeft: 10}}>
            <Image
              source={distanceIcon}
              style={{width: 27, height: 27, marginTop: 7}}
            />
            <Text numberOfLines={1} style={{fontSize: 17}}>
              {getDistance(
                userLat,
                userLong,
                dataPenginapan.lat,
                dataPenginapan.lng,
              ).toFixed(1)}{' '}
              km
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20, marginLeft: 10}}>
            <Image
              source={emailIcon}
              style={{width: 27, height: 27, marginTop: 7}}
            />
            <Text style={{fontSize: 17, marginTop: 5}}>
              {dataPenginapan.email}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20, marginLeft: 10}}>
            <Image
              source={moneyIcon}
              style={{width: 27, height: 27, marginTop: 7}}
            />
            <Text style={{fontSize: 17, marginTop: 5}}>
              {dataPenginapan.harga}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20, marginLeft: 10}}>
            <Image
              source={phoneIcon}
              style={{width: 27, height: 27, marginTop: 7}}
            />
            <Text style={{fontSize: 17, marginTop: 5}}>
              {dataPenginapan.no_hp}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Details;
