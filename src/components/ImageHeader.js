import React from 'react';
import {useEffect, useRef} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

function ImageHeader() {
  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

  const images = [
    require('./../assets/kamar.jpg'),
    require('./../assets/kamar.jpg'),
    require('./../assets/kamar.jpg'),
  ];
  useEffect(() => {
    let scrollPosition = 0;
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollPosition += width; // Pindah ke gambar berikutnya
        scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});

        // Jika sudah mencapai akhir, kembali ke awal
        if (scrollPosition >= width * (images.length - 1)) {
          scrollPosition = -width; // Set ke -width agar animasi terlihat smooth saat kembali
          setTimeout(() => {
            scrollViewRef.current.scrollTo({x: 0, animated: false});
          }, 500); // Waktu jeda untuk menyelesaikan animasi terakhir
        }
      }
    }, 3000); // Scroll setiap 3 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      style={{height: '100%', width: '100%'}}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16} // Agar smooth
      pagingEnabled={true} // Membuat scroll snap ke tiap halaman
    >
      {images.map((image, index) => (
        <View
          key={index}
          style={{
            height: 175,
            backgroundColor: '#63A2B0',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}>
          <Image
            style={{
              height: 175,
              width: width,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              marginTop: -13,
            }}
            source={image}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default ImageHeader;
