/**
 * TM352 23J TMA02 Q1, code
 *
 * 26/10/2023 Intial version Chris Thomson
 * 14/12/2023 Line 74 modified to getDate rather than getDay Chris Thomson
 * 
 * This is the main application code for the React Native application.
 * It is a simple application that allows a user to register a userid
 * and then make a taxi request or offer.
 * 
 * The application uses the Expo framework to provide access to the
 * device GPS and to provide a simple UI.
 * 
 * The application uses the TaxiService library to access the taxi
 * service API.
 * 
 * The application uses the NominatimService library to access the
 * Nominatim service to lookup the address of the current GPS location.
 * 
 * The application uses the TimePicker, AddressPicker and WaitTime
 * components to provide a simple UI.
 **/

import { Text, TextInput, Button, SafeAreaView, View, StyleSheet, Pressable } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import TimePicker from './components/TimePicker';
import AddressPicker from './components/AddressPicker';
import WaitTime from './components/WaitTime';
import { getLocationAddress } from './libraries/NominatimService';
import * as Taxi from './libraries/TaxiService';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import OwnerScreen from './screens/OwnerScreen';
import CustomerScreen from './screens/CustomerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // The UI for the application.
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Owner' component={OwnerScreen} />
        <Stack.Screen name='Customer' component={CustomerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
