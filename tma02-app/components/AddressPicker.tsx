/**
 * A component to allow an entry of an address. The parent view 
 * needs to handle the address lookup
 * 
 * TM352 TMA02
 * Change log
 * 3/10/23 CThomson Intial version
 */

import { Input, Layout, Button } from '@ui-kitten/components';
import { GestureResponderEvent } from 'react-native';

type AddressPickerProps = {
  label: string;
  address: string;
  onClick: (event: GestureResponderEvent) => void;
  onChangeAddress: (text: string) => void;
};

export default function AddressPicker(props: AddressPickerProps) {


  return (
    <Layout style={{padding:3}}>
      <Input multiline={true} placeholder={props.label} accessibilityLabel={props.label} value={props.address} onChangeText={props.onChangeAddress}/>
      <Button onPress={props.onClick} style={{marginVertical:5}}>Set current location</Button> 
    </Layout>
  );
}
