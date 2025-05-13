// In App.js in a new project

import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import History from './src/screens/History';
import Income from './src/screens/Income';
import Outcome from './src/screens/Outcome';
import SplashScreen from './src/screens/SplashScreen';
import EditIncome from './src/screens/EditIncome';

const Tab = createBottomTabNavigator();

// bottom tab navigasi
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('./src/assets/home.png');
          } else if (route.name === 'History') {
            iconSource = require('./src/assets/history.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#155E98' : 'gray',
              }}
            />
          );
        },

        tabBarActiveTintColor: '#155E98',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Outcome" component={Outcome} />
      <Stack.Screen name="EditIncome" component={EditIncome} />
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
