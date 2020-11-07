import React from 'react';
import {View, Text} from 'react-native';

import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/MaterialIcons"

import {detailStyle} from '../styles';

const RestaurantDetail = (props) => {
  function showPrice(length) {
    const priceLabel = [];

    for (let i = 0; i < length; i++) {
      priceLabel.push(
        <Icon key={i} name="euro" size={25} color="#33691e" />,
      );
    }

    return priceLabel;
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      style={{justifyContent:"flex-end", margin:0, marginHorizontal:10}}
      swipeDirection="down"
      onSwipeComplete={props.onClose}
    >
      <View style={detailStyle.container}>
        <View style={detailStyle.line} />
        <View style={detailStyle.line} />
        <Text style={detailStyle.name}>{props.restaurant.name}</Text>
        <Text style={detailStyle.address}>{props.restaurant.address}</Text>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon name="call" size={25}/>
            <Text style={detailStyle.phone}>{props.restaurant.phone}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              {showPrice(props.restaurant.price)}
            </View>
        </View>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </Text>
      </View>
    </Modal>
  );
};

export {RestaurantDetail};
