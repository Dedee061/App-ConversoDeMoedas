import {View, Text} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function index(props) {
  const placeholder = {
    label: 'Selecione uma moeda...',
    value: null,
    color: '#000'
  }
  
  return (
    <View>
      <RNPickerSelect
      placeholder={placeholder}
        items={props.moedas}
        onValueChange={(value) => props.onChange(value)}
        style={{
          inputIOS:{
            fontSize: 20,
            color: '#fff'
          },
          inputAndroid:{
            fontSize: 20,
            color: '#fff'
          }
        }}
      />
    </View>
  );
}
