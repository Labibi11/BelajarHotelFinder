import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const BackIcon = require('./../assets/back.png');
const kamar = require('./../assets/kamar.jpg');
const favorit = require('./../assets/Favorite.png');
const locationIcon = require('./../assets/location.png');
const distanceIcon = require('./../assets/distance.png');
const emailIcon = require('./../assets/email.png');
const phoneIcon = require('./../assets/phone.png');
const moneyIcon = require('./../assets/money.png');

function Details({route}) {
  const navigation = useNavigation();
  const {dataPenginapan} = route.params;
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
          source={kamar}
          style={{
            width: '100%',
            height: 250,
          }}
        />
        <View style={{marginLeft: 15, marginTop: 7}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginRight: 20,
            }}>
            <Text style={{fontSize: 22, margin: 5}}>{dataPenginapan.nama}</Text>
            <TouchableOpacity style={{marginTop: 15, marginBottom: 5}}>
              <Image source={favorit} style={{height: 33, width: 33}} />
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
            <Text style={{fontSize: 17, marginTop: 5}}>jarak</Text>
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
