import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { getLocationAddress } from '../libraries/NominatimService';
import * as Taxi from '../libraries/TaxiService';
import * as Location from 'expo-location';
import TimePicker from '../components/TimePicker';
import AddressPicker from '../components/AddressPicker';
import WaitTime from '../components/WaitTime';

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

export default function OwnerScreen({ route }) {
  
    const [ownerAddress, setOwnerAddress] = useState("");
    const [ownerHours, setOwnerHours] = useState("0");
    const [ownerMinutes, setOwnerMinutes] = useState("0");
    const [ownerMatches, setOwnerMatches] = useState("");
    const [ownerWait, setOwnerWait] = useState("0");
    const [ownerOrderid,setOwnerOrderid] = useState("");
    const [userid,setUserid] = useState("");


    
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
  
    useLayoutEffect(() => {
      console.log("Route params:" , route.params);
      if (route.params && route.params.userid) {
        setUserid(route.params.userid);
        console.log("UserID updated:", route.params.userid);
      }
    }, [route]);
  
    return (
      <SafeAreaView>
  
        <Text className='text-center text-xl font-bold'>
          Owner Offer
        </Text>
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