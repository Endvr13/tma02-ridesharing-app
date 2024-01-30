/**
 * A component to allow an entry of a time value in minutes from 0-60
 * and hours from 0-24
 * 
 * TM352 TMA02
 * Change log
 * 3/10/23 CThomson Intial version
 */

import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';

type TimePickerProps = {
  label: string;
  hours: string;
  minutes: string;
  onChangeHours: (text: string) => void;
  onChangeMinutes: (text: string) => void;
};

export default function TimePicker(props: TimePickerProps) {
  return (
    <View style={{}}>
      <Text>{props.label}</Text>
      <Layout style={{flexDirection:'row'}}>
        <Input style={{}} 
                  placeholder='hh' 
                  value={props.hours} 
                  onChangeText={props.onChangeHours} 
                  inputMode='numeric'/>
        <Text style={{fontSize: 24}}>:</Text>
        <Input style={{}} 
                  placeholder='mm' 
                  value={props.minutes} 
                  onChangeText={props.onChangeMinutes} 
                  inputMode='numeric'/> 

      </Layout>

    </View>
  );
}