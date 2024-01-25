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

import { Text, TextInput, Button, SafeAreaView, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import TimePicker from './components/TimePicker';
import AddressPicker from './components/AddressPicker';
import WaitTime from './components/WaitTime';
import { getLocationAddress } from './libraries/NominatimService';
import * as Taxi from './libraries/TaxiService';
import * as Location from 'expo-location';

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

export default function App() {
  // State variables to hold the data entered by the user.
  const [ownerAddress, setOwnerAddress] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [ownerHours, setOwnerHours] = useState("0");
  const [ownerMinutes, setOwnerMinutes] = useState("0");
  const [ownerMatches, setOwnerMatches] = useState("");
  const [customerHours, setCustomerHours] = useState("0");
  const [customerMinutes, setCustomerMinutes] = useState("0");
  const [ownerWait, setOwnerWait] = useState("0");
  const [userid,setUserid] = useState("");
  const [ownerOrderid,setOwnerOrderid] = useState("");
  const [customerMatches, setCustomerMatches] = useState("");
  const [customerPickupid, setCustomerPickupid] = useState("0");
  
  //Make sure we can get the GPS location when required.
  getUserPermission();
  
  const getOwnerData = async () => {
    // fetch the current location.
    const location = await Location.getCurrentPositionAsync({});

    const address = await getLocationAddress(location.coords.latitude, location.coords.longitude);
    setOwnerAddress(address.display_name);
  }

  const getCustomerData = async () => {
    const location = await Location.getCurrentPositionAsync({});

    const address = await getLocationAddress(location.coords.latitude, location.coords.longitude)
    setCustomerAddress(address.display_name);
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
  
  // The UI for the application.
  return (
    <SafeAreaView className='flex-1 justify-center bg-[#ecf0f1]'>
      <Text className='text-center text-xl font-bold'>
        Owner Offer
      </Text>
      <AddressPicker label='Waiting address' address={ownerAddress} onClick={getOwnerData} onChangeAddress={setOwnerAddress} />
      <TimePicker label='Start to wait at (24hrs)' hours={ownerHours} minutes={ownerMinutes} onChangeHours={setOwnerHours} onChangeMinutes={setOwnerMinutes}/>
      <WaitTime label='Wait time (minutes)' minutes={ownerWait} onChangeMinutes={setOwnerWait} />
      <View style={styles.hcontainer} >
        <Button title="Make" onPress={transportOwnerMake} />
        <Button title="Cancel" onPress={transportOwnerCancel} />
        <Button title="Matches" onPress={transportOwnerMatches} />
      </View>
      <Text style={styles.matches}>
          Matches: {ownerMatches}
      </Text>
          
      <Text style={styles.paragraph}>
        Customer Request
      </Text>
      <AddressPicker label='Pickup address' address={customerAddress} onClick={getCustomerData} onChangeAddress={setCustomerAddress} />
      <TimePicker label='Pickup time (24hrs)' hours={customerHours} minutes={customerMinutes} onChangeHours={setCustomerHours} onChangeMinutes={setCustomerMinutes}/>
      <View style={styles.hcontainer} >
        <Button title="Make" onPress={customerMake}/>
        <Button title="Cancel" onPress={customerCancel} />
        <Button title="Matches" />
      </View>
      <Text style={styles.matches}>
          Matches: {customerMatches}
      </Text>

      <Text style={styles.paragraph}>
        Login
      </Text>
      <View style={styles.hcontainer}>
        <TextInput style={styles.input} value={userid} onChangeText={setUserid}/>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  hcontainer: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'space-between',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 5,
    width: 200,
  },
  matches: {
    margin: 24,
    fontSize: 9,
    textAlign: 'center',
  },
});
