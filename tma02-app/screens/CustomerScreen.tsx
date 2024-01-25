import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { getLocationAddress } from '../libraries/NominatimService';
import * as Taxi from '../libraries/TaxiService';
import * as Location from 'expo-location';
import TimePicker from '../components/TimePicker';
import AddressPicker from '../components/AddressPicker';
import WaitTime from '../components/WaitTime';

export default function CustomerScreen({ route }) {

    const [customerAddress, setCustomerAddress] = useState("");
    const [customerHours, setCustomerHours] = useState("0");
    const [customerMinutes, setCustomerMinutes] = useState("0");
    const [customerMatches, setCustomerMatches] = useState("");
    const [customerPickupid, setCustomerPickupid] = useState("0");
    const [userid,setUserid] = useState("");
    
    useLayoutEffect(() => {
      console.log("Route params:" , route.params);
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
      <SafeAreaView>
          <Text>
            Customer Request
          </Text>
          <Text>UserID: {userid}</Text>
          <AddressPicker label='Pickup address' address={customerAddress} onClick={getCustomerData} onChangeAddress={setCustomerAddress} />
          <TimePicker label='Pickup time (24hrs)' hours={customerHours} minutes={customerMinutes} onChangeHours={setCustomerHours} onChangeMinutes={setCustomerMinutes}/>
          <View>
            <Button title="Make" onPress={customerMake}/>
            <Button title="Cancel" onPress={customerCancel} />
            <Button title="Matches" />
          </View>
          <Text>
              Matches: {customerMatches}
          </Text>
      </SafeAreaView>
    )
  }