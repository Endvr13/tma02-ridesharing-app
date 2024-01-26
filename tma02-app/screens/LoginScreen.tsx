import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';


import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Represents the parameter list for the root stack navigation.
 */
type RootStackParamList = {
  Login: {userid: string};
  Customer: {userid: string};
  Owner: {userid: string}
};

/**
 * Represents the props for the LoginScreen component.
 */
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

/**
 * Renders a login screen component.
 * @param navigation - The navigation object from React Navigation.
 * @returns The rendered login screen component.
 */
export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [userid, setUserid] = useState("");

  /**
   * Handles the login for a customer.
   * Navigates to the 'Customer' screen with the provided user ID.
   */
  const handleCustomerLogin = () => {
    navigation.navigate('Customer', { userid: userid });
  };

  /**
   * Handles the login for an owner.
   * Navigates to the 'Owner' screen with the provided user ID.
   */
  const handleOwnerLogin = () => {
    navigation.navigate('Owner', { userid: userid });
  };

  return (
    <View className='bg-gray-100'>
      <Text>
        Login
      </Text>
      <View className='justify-center items-center py-5'>
        <TextInput className='bg-white w-1/2 text-center rounded-md' value={userid} onChangeText={setUserid} />
      </View>
      <View className='flex-row mx-5 justify-center'>
        <Pressable
          className='bg-blue-200 px-2 rounded-md'
          onPress={() => {
            handleCustomerLogin();
          }}>
          <Text className='text-xl'>Customer Login</Text>
        </Pressable>
        <Pressable
          className='ml-2 bg-blue-200 px-2 rounded-md'
          onPress={() => {
            handleOwnerLogin();
          }}>
          <Text className='text-xl'>Owner Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
