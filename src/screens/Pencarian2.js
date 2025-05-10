import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
const kamar = require('./../assets/kamar.jpg');
const BackIcon = require('./../assets/back.png');
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));

function Pencarian2() {
  const navigation = useNavigation();
  const [penginapan, setPenginapan] = useState([]);
  const [filteredPenginapan, setFilteredPenginapan] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenginapan = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://192.168.43.6/api-test/api_penginapan.php',
        );
        setPenginapan(response.data.data);
        setFilteredPenginapan(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching penginapan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPenginapan();
  }, []);

  const handleSearch = () => {
    const hasil = penginapan.filter(
      item =>
        item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.alamat.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredPenginapan(hasil);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
      {/* Input Pencarian */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            height: 50,
            marginTop: 15,
            marginLeft: 7,
            marginRight: -15,
          }}>
          <Image source={BackIcon} style={{width: 50, height: 50}} />
        </TouchableOpacity>
        <View style={{margin: 20, marginBottom: -20}}>
          <TextInput
            placeholder="Cari nama atau alamat penginapan..."
            value={searchText}
            onChangeText={setSearchText}
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              width: 250,
              height: 40,
            }}
          />
        </View>

        {/* Tombol Cari */}
        <View>
          <TouchableOpacity onPress={handleSearch}>
            <Text
              style={{
                backgroundColor: '#074799',
                textAlign: 'center',
                color: 'white',
                paddingTop: 7,
                width: 50,
                height: 35,
                marginTop: 23,
                marginLeft: -10,
                borderRadius: 10,
              }}>
              Cari
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading dan List Penginapan */}
      {loading ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>Loading...</Text>
      ) : filteredPenginapan.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          Tidak ditemukan penginapan yang sesuai.
        </Text>
      ) : (
        <ScrollView>
          {filteredPenginapan.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', {dataPenginapan: item})
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
                    source={kamar}
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
      )}
    </View>
  );
}

export default Pencarian2;
