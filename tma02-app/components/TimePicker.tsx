/**
 * A component to allow an entry of a time value in minutes from 0-60
 * and hours from 0-24
 * 
 * TM352 TMA02
 * Change log
 * 3/10/23 CThomson Intial version
 */

import {Input, Layout, Text } from '@ui-kitten/components';

type TimePickerProps = {
  label: string;
  hours: string;
  minutes: string;
  onChangeHours: (text: string) => void;
  onChangeMinutes: (text: string) => void;
};

export default function TimePicker(props: TimePickerProps) {
  return (
      <Layout style={{justifyContent:'center', alignItems:'center', padding:3 }}>
        <Text style={{fontSize:24, paddingBottom:5}}>{props.label}</Text>
        <Layout style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Input style={{width:'12%'}} 
                    placeholder='hh' 
                    onChangeText={props.onChangeHours} 
                    inputMode='numeric'
                    maxLength={2}/>
          <Text style={{fontSize: 24, paddingHorizontal:2}}>:</Text>
          <Input style={{width:'12%'}} 
                    placeholder='mm' 
                    onChangeText={props.onChangeMinutes} 
                    inputMode='numeric'
                    maxLength={2}/> 
        </Layout>
      </Layout>
  );
}