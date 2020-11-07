import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { cityStyle } from '../styles';

import Icon from "react-native-vector-icons/MaterialIcons"

const City = (props) => {
  return (
    <TouchableOpacity style={cityStyle.container} onPress={props.onSelect}>
      <Icon name="apartment" size={20}/>
      <Text style={cityStyle.text}>{props.item}</Text>
    </TouchableOpacity>
  );
};

export {City};
