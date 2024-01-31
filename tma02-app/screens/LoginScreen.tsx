<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input, Button, Layout,Text, } from '@ui-kitten/components';
import  TopNavigationBar  from '../components/TopNavigationBar';
=======
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input, Button, Layout, TopNavigation, Divider, Text } from '@ui-kitten/components';

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
/**
 * Renders a login screen component.
 * @param navigation - The navigation object from React Navigation.
 * @returns The rendered login screen component.
 */
>>>>>>> Stashed changes
export const LoginScreen = ({ navigation }: LoginScreenProps) => {

  const [userid, setUserid] = useState("");

  useEffect(() => {
    const resetUserid = navigation.addListener('focus', () => {
      // Reset userid when the LoginScreen is in focus
      setUserid("");
    });

    return resetUserid;
  }, [navigation]);
  /**
   * Handles the login for a customer.
   * Navigates to the 'Customer' screen with the provided user ID.
   */
  const navigateCustomerLogin = () => {
    navigation.navigate('Customer', { userid: userid });
  };

  /**
   * Handles the login for an owner.
   * Navigates to the 'Owner' screen with the provided user ID.
   */
  const navigateOwnerLogin = () => {
    navigation.navigate('Owner', { userid: userid });
  };


  return (
    <Layout style={{flex: 1}}>
<<<<<<< Updated upstream
      <TopNavigationBar title={() => <Text  style={{ fontSize: 24, fontWeight: 'bold'}}>Login</Text>} showBackButton={false}/>
        <Layout level='2' style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 16 }}>
          <Input placeholder='Enter User ID' value={userid} onChangeText={setUserid} style={{ margin: 5}}/>
          <Layout level='1' style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 16, borderRadius: 5 }}>
=======
      <TopNavigation title={() => <Text style={{ fontSize: 24, fontWeight: 'bold'}}>Login</Text>} style={{backgroundColor:'rgb(21, 26, 48)'}} alignment='center'/>
        <Layout level='2' style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 16 }}>
          <Input placeholder='Enter User ID'  onChangeText={setUserid} style={{ margin: 5}}/>
          <Layout level='1' style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-start', padding: 16, borderRadius: 5 }}>
>>>>>>> Stashed changes
            <Button
              onPress={navigateCustomerLogin} style={{minWidth:75}}>Customer Login</Button>
            <Button 
              onPress={navigateOwnerLogin} style={{minWidth:75}}>Owner Login</Button>
          </Layout>
        </Layout>
        
    </Layout>

  );
}
