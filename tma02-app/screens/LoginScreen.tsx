import React, { useContext, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input, Button, Layout, TopNavigation, Divider, Text, Icon, TopNavigationAction } from '@ui-kitten/components';
import { ThemeContext } from '../components/theme-context';


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

const themeContext = useContext(ThemeContext);

const themeIcon = (props: any) => (
  <Icon {...props} name={themeContext.theme === 'light' ? 'moon-outline' : 'sun-outline'}/>
);
/**
 * Renders a login screen component.
 * @param navigation - The navigation object from React Navigation.
 * @returns The rendered login screen component.
 */  



export const LoginScreen = ({ navigation }: LoginScreenProps) => {

  const [userid, setUserid] = useState("");

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

  const toggleDarkMode = () => (
    <TopNavigationAction icon={themeIcon} onPress={themeContext.toggleTheme}/>
  );

  return (
    <Layout style={{flex: 1}}>
      <TopNavigation title={() => <Text style={{ fontSize: 24, fontWeight: 'bold'}}>Login</Text>} style={{backgroundColor:'rgb(21, 26, 48)'}} alignment='center' accessoryRight={toggleDarkMode}/>
        <Layout level='2' style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 16 }}>
          <Input placeholder='Enter User ID'  onChangeText={setUserid} style={{ margin: 5}}/>
          <Layout level='1' style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-start', padding: 16, borderRadius: 5 }}>
            <Button
              onPress={navigateCustomerLogin} style={{minWidth:75}}>Customer Login</Button>
            <Button 
              onPress={navigateOwnerLogin} style={{minWidth:75}}>Owner Login</Button>
          </Layout>
        </Layout>
        
    </Layout>

  );
}
