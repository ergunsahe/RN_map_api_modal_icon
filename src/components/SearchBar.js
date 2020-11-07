import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import {searchbarStyle} from '../styles';


const SearchBar = (props) => {
  return (
    <View style={searchbarStyle.container}>
      <Icon name="saved-search" size={30} color='gray'/>
      <TextInput
        style={searchbarStyle.input}
        placeholder="Search a city.."
        onChangeText={(val) =>props.onSearch(val)}
      />
    </View>
  );
};

export {SearchBar};
