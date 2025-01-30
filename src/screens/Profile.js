import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
const ProfileIcon = require('./../assets/Profil.png');

function Profile() {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#074799',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
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
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>NAMA</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>TEMPAT/TANGGAL LAHIR</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>ALAMAT</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>JENIS KELAMIN</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>AGAMA</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>NO HP</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>EMAIL</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
          }}>
          <Text style={{fontSize: 17}}>STATUS</Text>
          <Text style={{marginLeft: 50, marginVertical: 10, fontSize: 17}}>
            KETERANGAN
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
//
export default Profile;
