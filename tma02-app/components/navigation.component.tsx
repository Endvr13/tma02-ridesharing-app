import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CustomerScreen } from '../screens/CustomerScreen';
import { OwnerScreen } from '../screens/OwnerScreen';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Login' component={LoginScreen}/>
    <Stack.Screen name='Customer' component={CustomerScreen} initialParams={{ userid:''}}/>
    <Stack.Screen name='Owner' component={OwnerScreen} initialParams={{ userid:''}}/>
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <LoginNavigator/>
  </NavigationContainer>
);