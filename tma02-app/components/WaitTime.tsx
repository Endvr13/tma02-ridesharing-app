/**
 * A component to allow an entry of a time value in minutes from 0-60
 * 
 * TM352 TMA02
 * Change log
 * 3/10/23 CThomson Intial version
 */

import { Divider, Input, Layout, Text } from '@ui-kitten/components';

type WaitTimeProps = {
  label: string;
  minutes: string;
  onChangeMinutes: (text: string) => void;
};

export default function WaitTime(props: WaitTimeProps) {
  return (
    <Layout style={{flexDirection:'column', justifyContent:'center', alignItems:'center', padding:3 }}>
      <Text style={{fontSize:24, paddingBottom:5}}>{props.label}</Text>
      <Divider/>
      <Layout style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Input style={{width:'30%'}} 
                  placeholder='mins' 
                  onChangeText={props.onChangeMinutes} 
                  inputMode='numeric'
                  maxLength={3}
                  textStyle={{textAlign: 'left'}}/>
      </Layout>
    </Layout>
  );
}