import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
const kamar = require('./../assets/kamar.jpg');
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Favorite() {
  const navigation = useNavigation();
  const [penginapan, setPenginapan] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchPenginapan = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setLoading(true);
        try {
          const response = await axios.get(
            `http://192.168.43.6/api-test/api_favorite.php?user_id=${userId}`,
          );
          const result = response.data;

          if (result.status === 'success') {
            setPenginapan(response.data.data.map(item => item.penginapan));
          } else {
            setPenginapan([]);
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      };
      console.log(penginapan);
      fetchPenginapan();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#efefef'}}>
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
      <ScrollView style={{backgroundColor: '#efefef'}}>
        {penginapan.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {dataPenginapan: item})
              }
              key={index}
              style={{
                margin: 20,
                backgroundColor: '#ffffff',
                borderRadius: 20,
              }}>
              <View>
                <Image
                  source={kamar}
                  style={{width: 353, height: 200, borderRadius: 20}}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  paddingVertical: 10,

                  width: '90%',
                }}>
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
    </View>
  );
}

export default Favorite;
