import React, { useState, useEffect} from 'react';
import { getLocationAddress } from '../libraries/NominatimService';
import * as Taxi from '../libraries/TaxiService';
import * as Location from 'expo-location';
import TimePicker from '../components/TimePicker';
import AddressPicker from '../components/AddressPicker';
import WaitTime from '../components/WaitTime';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
<<<<<<< Updated upstream
import TopNavigationBar from '../components/TopNavigationBar';
import { Button, Divider, Layout, Text } from '@ui-kitten/components';
import MatchMaker from '../components/MatchMaker';
=======
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export const OwnerScreen = ({ route }: OwnerScreenProps) => {
=======

const BackIcon = (props: any) => (
  <Icon {...props} name='arrow-back'/>
);


export const OwnerScreen = ({ navigation, route }: OwnerScreenProps) => {
>>>>>>> Stashed changes
  
    const [ownerAddress, setOwnerAddress] = useState("");
    const [ownerHours, setOwnerHours] = useState("0");
    const [ownerMinutes, setOwnerMinutes] = useState("0");
    const [ownerWait, setOwnerWait] = useState("0");
    const [ownerOrderid,setOwnerOrderid] = useState("0");
    const [userid,setUserid] = useState("");

<<<<<<< Updated upstream
=======
    const navigateBack = () => {
      navigation.goBack();
    };

    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

>>>>>>> Stashed changes
    
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
  
    useEffect(() => {
      if (route.params && route.params.userid) {
        setUserid(route.params.userid);
      }
    }, [route]);
  
    return (
<<<<<<< Updated upstream
      <Layout style={{flex:1}}>
          <TopNavigationBar title={() => <Text style={{ fontSize: 24, fontWeight: 'bold'}}>Owner: {userid}</Text>} showBackButton={true}/>      
          <Layout level='1' style={{flex:1, justifyContent: 'flex-start', marginHorizontal:16 }}>
            <Layout style={{justifyContent:'center', paddingTop:20}}>
              <AddressPicker label='Pickup address' address={ownerAddress} onClick={getOwnerData} onChangeAddress={setOwnerAddress} />
              <Divider/>
              <TimePicker label='Start time (24hrs)' hours={ownerHours} onChangeHours={setOwnerHours} minutes={ownerMinutes} onChangeMinutes={setOwnerMinutes}></TimePicker>
              <WaitTime label="Wait time" minutes={ownerWait} onChangeMinutes={setOwnerWait}></WaitTime>
              <Layout style={{flexDirection: 'row', gap: 5, marginVertical:5, justifyContent:'center'}}>
                <Button onPress={transportOwnerMake} style={{flex:1}}>Make</Button>
                <Button onPress={transportOwnerCancel} style={{flex:1}}>Cancel</Button>
              </Layout>   
              <Layout style={{}}>
                <MatchMaker userid={userid} userType='owner'/>
              </Layout>
            </Layout>
          </Layout>
      </Layout>
=======
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
>>>>>>> Stashed changes
  
    )
  
  }