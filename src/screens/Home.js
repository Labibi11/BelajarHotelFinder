import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
                source={{uri: 'http://192.168.43.6/api-test/admin/'+item.foto}}
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
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default Home;
