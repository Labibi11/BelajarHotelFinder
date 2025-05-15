import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Favorite from './src/screens/Favorite';
import Pencarian from './src/screens/Pencarian';
import Profile from './src/screens/Profile';
import Login from './src/screens/Login';
import Details from './src/screens/Details';
import Register from './src/screens/Register';
import SplashScreen from './src/screens/SplashScreen';
import EditProfile from './src/screens/EditProfile';
import Pencarian2 from './src/screens/Pencarian2';

const HomeIcon = require('./src/assets/Home.png');
const FavoriteIcon = require('./src/assets/Favorite.png');
const SearchIcon = require('./src/assets/Search.png');
const ProfileIcon = require('./src/assets/User.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#009990',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={HomeIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#009990' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={FavoriteIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#009990' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pencarian"
        component={Pencarian}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={SearchIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#009990' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={ProfileIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#009990' : 'gray',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Pencarian" component={Pencarian} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Pencarian2" component={Pencarian2} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
