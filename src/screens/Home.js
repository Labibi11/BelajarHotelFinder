import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import ImageHeader from '../components/ImageHeader';
const kamar = require('./../assets/kamar.jpg');

function Home() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
      <ScrollView>
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
        {[1, 1, 1, 1, 1, 1, 1].map((item, index) => {
          return (
            <View
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
                  source={kamar}
                  style={{width: 100, height: 100, borderRadius: 20}}
                />
              </View>
              <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 17}}>NAMA HOTEL</Text>
                <Text style={{fontSize: 17}}>KETERANGAN</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Home;
