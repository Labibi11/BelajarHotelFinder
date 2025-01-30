import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
const kamar = require('./../assets/kamar.jpg');

function Home() {
  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
      <View>
        <Image
          source={kamar}
          style={{
            height: 200,
            width: 392,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        />
      </View>
      <TouchableOpacity>
        <Text
          style={{
            backgroundColor: '#074799',
            textAlign: 'center',
            marginHorizontal: 130,
            color: 'white',
            marginVertical: 20,
            padding: 15,
            borderRadius: 30,
          }}>
          Mulai Mencari
        </Text>
      </TouchableOpacity>
      <View style={{margin: 20, borderBottomWidth: 1}}>
        <Text style={{fontSize: 18}}>Last Seen</Text>
      </View>
      <View
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
            source={kamar}
            style={{width: 100, height: 100, borderRadius: 20}}
          />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{fontSize: 17}}>KETERANGAN</Text>
        </View>
      </View>
      <View
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
            source={kamar}
            style={{width: 100, height: 100, borderRadius: 20}}
          />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
          <Text style={{fontSize: 17}}>KETERANGAN</Text>
        </View>
      </View>
    </View>
  );
}

export default Home;
