import * as React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
const kamar = require('./../assets/kamar.jpg');

function Pencarian() {
  return (
    <View style={{flex: 1}}>
      <View>
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: '#074799',
              textAlign: 'center',
              marginHorizontal: 150,
              color: 'white',
              marginVertical: 20,
              padding: 15,
              borderRadius: 30,
            }}>
            Cari
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            flexDirection: 'row',
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
      </ScrollView>
    </View>
  );
}

export default Pencarian;
