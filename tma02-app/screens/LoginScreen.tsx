import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';


export default function LoginScreen({ navigation }) {
    const [userid,setUserid] = useState("");
  
    const handleCustomerLogin = () => {
      navigation.navigate('Customer', { userid: userid });
    };
  
    const handleOwnerLogin = () => {
      navigation.navigate('Owner', { userid: userid });
    };
  
    return (
      <View>
        <Text>
          Login
        </Text>
        <View className='justify-center items-center py-5'>
          <TextInput className='bg-white w-1/2 text-center rounded-md' value={userid} onChangeText={setUserid}/>
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
    )
  }