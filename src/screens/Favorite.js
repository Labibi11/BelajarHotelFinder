import * as React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
const kamar = require('./../assets/kamar.jpg');

function Favorite() {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 0.7,
          borderColor: 'gray',
        }}>
        <Text
          style={{
            fontSize: 20,
            margin: 20,
            fontWeight: 'bold',
          }}>
          FAVORITE
        </Text>
      </View>
      <ScrollView style={{backgroundColor: '#f8f8f8'}}>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Image source={kamar} style={{width: 350, height: 200}} />
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{marginVertical: 10, fontSize: 17}}>KETERANGAN</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Image source={kamar} style={{width: 350, height: 200}} />
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{marginVertical: 10, fontSize: 17}}>KETERANGAN</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Image source={kamar} style={{width: 350, height: 200}} />
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{marginVertical: 10, fontSize: 17}}>KETERANGAN</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Image source={kamar} style={{width: 350, height: 200}} />
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{marginVertical: 10, fontSize: 17}}>KETERANGAN</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Favorite;
