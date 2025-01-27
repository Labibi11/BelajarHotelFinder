import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.replace('MyTabs')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
