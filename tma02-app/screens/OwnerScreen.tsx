import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { getLocationAddress } from '../libraries/NominatimService';
import * as Taxi from '../libraries/TaxiService';
import * as Location from 'expo-location';
import TimePicker from '../components/TimePicker';
import AddressPicker from '../components/AddressPicker';
import WaitTime from '../components/WaitTime';


import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

type RootStackParamList = {
  Owner: {userid: string};
};

type OwnerScreenProps = {
  route: RouteProp<RootStackParamList, 'Owner'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Owner'>;
};

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


export const OwnerScreen: React.FC<OwnerScreenProps> = ({ navigation, route }: OwnerScreenProps) => {
  
    const [ownerAddress, setOwnerAddress] = useState("");
    const [ownerHours, setOwnerHours] = useState("0");
    const [ownerMinutes, setOwnerMinutes] = useState("0");
    const [ownerMatches, setOwnerMatches] = useState("");
    const [ownerWait, setOwnerWait] = useState("0");
    const [ownerOrderid,setOwnerOrderid] = useState("");
    const [userid,setUserid] = useState("");

    const navigateBack = () => {
      navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    
      //Make sure we can get the GPS location when required.
    getUserPermission();
    
    const getOwnerData = async () => {
      // fetch the current location.
      const location = await Location.getCurrentPositionAsync({});
  
      const address = await getLocationAddress(location.coords.latitude, location.coords.longitude);
      setOwnerAddress(address.display_name);
    }
  
    const transportOwnerMake = async () => {
      const now = new Date();
      // Create a start and end time for the order.
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(ownerHours), parseInt(ownerMinutes));
      const end =  new Date(start.getTime() + parseInt(ownerWait)*60000);
        
      const order = await Taxi.postOrders(userid, start.toISOString(), end.toISOString(), "0", ownerAddress);
      setOwnerOrderid(order.id);
    }
  
    const transportOwnerCancel = () => {
      if (ownerOrderid != "")
        Taxi.deleteOrders(userid, ownerOrderid);
      setOwnerOrderid("");
    }
    
    const transportOwnerMatches = async () => {
      const matches = await Taxi.getMatches(userid);
      setOwnerMatches(JSON.stringify(matches));
    }  
  
    useEffect(() => {
      console.log("Route params:" , route.params);
      if (route.params && route.params.userid) {
        setUserid(route.params.userid);
        console.log("UserID updated:", route.params.userid);
      }
    }, [route]);
  
    return (
      <SafeAreaView>
        <TopNavigation title={() => <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white'}}>Owner</Text>} style={{backgroundColor:'rgb(21, 26, 48)'}} alignment='center' accessoryLeft={BackAction}/>
        <Text>UserID: {userid}</Text>
        <AddressPicker label='Waiting address' address={ownerAddress} onClick={getOwnerData} onChangeAddress={setOwnerAddress} />
        <TimePicker label='Start to wait at (24hrs)' hours={ownerHours} minutes={ownerMinutes} onChangeHours={setOwnerHours} onChangeMinutes={setOwnerMinutes}/>
        <WaitTime label='Wait time (minutes)' minutes={ownerWait} onChangeMinutes={setOwnerWait} />
        <View>
          <Button title="Make" onPress={transportOwnerMake} />
          <Button title="Cancel" onPress={transportOwnerCancel} />
          <Button title="Matches" onPress={transportOwnerMatches} />
        </View>
        <Text>
            Matches: {ownerMatches}
        </Text>
      </SafeAreaView>
  
    )
  
  }