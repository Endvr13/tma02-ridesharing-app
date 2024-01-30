import React, { useState, useEffect } from 'react';
import { getLocationAddress } from '../libraries/NominatimService';
import * as Taxi from '../libraries/TaxiService';
import * as Location from 'expo-location';
import TimePicker from '../components/TimePicker';
import AddressPicker from '../components/AddressPicker';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

/**
 * Represents the parameter list for the root stack in the navigation.
 */
type RootStackParamList = {
  Customer: {userid: string};
};

/**
 * Represents the props for the CustomerScreen component.
 */
type CustomerScreenProps = {
  route: RouteProp<RootStackParamList, 'Customer'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Customer'>;
}

/**
 * Requests user permission to get the GPS location of the device.
 * This needs to be called before the GPS is read.
 * 
 * @returns true if permission is granted, otherwise throws an error.
 */
async function getUserPermission(): Promise<boolean> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw('Permission to access location was denied, please check your device settings.');
  } else {
    return true;
  }
}

const BackIcon = (props: any) => (
  <Icon {...props} name='arrow-back'/>
);

export const CustomerScreen = ({navigation, route}: CustomerScreenProps) => {

    const [customerAddress, setCustomerAddress] = useState("");
    const [customerHours, setCustomerHours] = useState("0");
    const [customerMinutes, setCustomerMinutes] = useState("0");
    const [customerMatches, setCustomerMatches] = useState("");
    const [customerPickupid, setCustomerPickupid] = useState("0");
    const [userid,setUserid] = useState("");

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    /**
     * useEffect hook that logs the route parameters and updates the userid state if it exists in the route params.
     * @param route - The route object containing the parameters.
     */
    useEffect(() => {
      console.log("Route params:", route.params);
      if (route.params && route.params.userid) {
        setUserid(route.params.userid);
        console.log("UserID updated:", route.params.userid);
      }
    }, [route]);
  
    const getCustomerData = async () => {
      const location = await Location.getCurrentPositionAsync({});
  
      const address = await getLocationAddress(location.coords.latitude, location.coords.longitude)
      setCustomerAddress(address.display_name);
    }
  
    const customerMake = async () => {
      const now = new Date();
      const pickup = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(customerHours), parseInt(customerMinutes)); 
     
      const request = await Taxi.postOrders(userid, pickup.toISOString(), pickup.toISOString(), "1", customerAddress);
      setCustomerPickupid(request.id);
      
    }
  
    const customerCancel = () => {
      if (customerPickupid != "")
        Taxi.deleteOrders(userid, customerPickupid);
      setCustomerPickupid("");
    }
  
    return (
      <Layout style={{ flex: 1}}>
          <TopNavigation title={() => <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white'}}>Owner</Text>} style={{backgroundColor:'rgb(21, 26, 48)'}} alignment='center' accessoryLeft={BackAction}/>
          <Layout level='1' style={{alignItems: 'center' }}>
            <Text>UserID: {userid}</Text>
            <AddressPicker label='Pickup address' address={customerAddress} onClick={getCustomerData} onChangeAddress={setCustomerAddress} />
            <TimePicker label='Pickup time (24hrs)' hours={customerHours} minutes={customerMinutes} onChangeHours={setCustomerHours} onChangeMinutes={setCustomerMinutes}/>
            <Layout style={{flexDirection: 'row', gap: 5, marginVertical:5}}>
              <Button onPress={customerMake}>Make</Button>
              <Button onPress={customerCancel}>Cancel</Button>
            </Layout>
            <Button>Matches</Button>
            <Text>
                Matches: {customerMatches}
            </Text>
          </Layout>
      </Layout>
    )
  }