import { Card, Layout, List, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import * as Taxi from '../libraries/TaxiService';

type MatchMakerProps = {
    userid: string;
    userType: string;

};

export default function MatchMaker(props: MatchMakerProps) {

    const [matches, setMatches] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
  
    const fetchMatches = async () => {
      try {
        // Replace 'USER_ID_TO_FETCH' with the actual user ID for which you want to fetch details
        const userIdToFetch = props.userid;
        const matchesData = await Taxi.getMatches(userIdToFetch);
        
        setMatches([]);
        setButtonPressed(false);

        setMatches(matchesData);
        setButtonPressed(true);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    const formatTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();

        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

        return { formattedTime, formattedDate}
    };
  
    const renderMatchDetails = ({ item }: { item: any }) => {
        const isCustomer = props.userType === 'customer';

        const { formattedTime: formattedOfferStartTime, formattedDate: dateOfferStart } = formatTime(item.offer_start);
        const { formattedTime: formattedOfferEndTime} = formatTime(item.offer_end);
        const { formattedTime: formattedHireStartTime} = formatTime(item.hire_start);

        return (
        <Card style={{ margin: 10}}>
            <Layout style={{ justifyContent:'center' ,alignItems:'center'}}>
                <Text style={{fontSize:24, fontWeight:'bold'}}>Offer</Text>
            </Layout>
            <Layout style={{flexDirection:'row'}}>
                <Text>User: {isCustomer ? item.offer_userid : item.hire_userid}</Text>
            </Layout>
            <Layout style={{flexDirection:'row'}}>
                <Text>Pickup Address: {item.offer_address}</Text>
            </Layout>
            {isCustomer ? 
                <Layout>
                    <Layout style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:"bold"}}>Waiting start time:</Text>
                        <Text> {formattedOfferStartTime}</Text>                        
                    </Layout>
                    <Layout style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:"bold"}}>Waiting end time:</Text>
                        <Text> {formattedOfferEndTime}</Text>                        
                    </Layout>
                </Layout>
                :
                <Layout style={{flexDirection:'row'}}>    
                    <Text style={{fontWeight:"bold"}}>Pickup time:</Text><Text> {formattedHireStartTime}</Text>
                </Layout>
            }
            <Layout style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold'}}>Date:</Text><Text> {dateOfferStart}</Text>
            </Layout>
            
        </Card>
        );
    };
        
    return (
      <Layout>
        <Button onPress={fetchMatches}>Find Matches</Button>
  
        {buttonPressed && matches && matches.length > 0 && (
          <List
            style={{marginTop:10}}
            data={matches}
            renderItem={renderMatchDetails}
            keyExtractor={(item) => item.offer_userid}
          />
        )}

        {buttonPressed && (!matches || matches.length === 0) && (
            <Layout style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text >No matches found. Please try again later.</Text>
            </Layout>
        )}
      </Layout>
    );
  };
  