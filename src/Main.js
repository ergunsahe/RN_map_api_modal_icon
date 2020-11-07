import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, Text, FlatList, Image} from 'react-native';
import axios from "axios"

import MapView, {Marker} from 'react-native-maps';

import Icon from "react-native-vector-icons/MaterialIcons"

import {img, mapStyle} from "./styles"

import {City, RestaurantDetail, SearchBar} from './components';


let originalList=[]
const Main = (props) => {
  const [hour, setHour]=useState(false)
  const [selectedrestaurant, setSelectedRestaurant]=useState('')
  const [modalFlag, setModalFlag]=useState(false)
  const [cityList, setCityList]=useState([])
  const [restaurantList, setRestaurantlist]=useState([])
  const mapRef= useRef(null)

  function fetchData (){
    axios.get("https://opentable.herokuapp.com/api/cities")
    .then(response =>{
        setCityList(response.data.cities)
        originalList=[...response.data.cities]
    })
  }
  useEffect(() =>{
    fetchData()
    const time= new Date().getHours()
  
    if ( time > 19 || time < 7){
      setHour(true)
      
    }
  }, [])

  const renderCities=({item}) =>{
    return <City item={item} onSelect={() =>onSelectedCity(item)}/>
  }

  const onSearchCity=(text)=>{
    const filteredList= originalList.filter((city) =>{
      const search=text.toUpperCase()
      const cityName=city.toUpperCase()
      return cityName.indexOf(search) > -1
    })
    setCityList(filteredList)
  }

  const onSelectedCity = async (item)=>{
      const response = await axios.get("https://opentable.herokuapp.com/api/restaurants?city=" + item)
      // console.log(data.restaurants)
      setRestaurantlist(response.data.restaurants)

      const coordinates= response.data.restaurants.map((r) =>{
        return({
          latitude:r.lat,
          longitude:r.lng
        })
      })

      mapRef.current.fitToCoordinates(coordinates, {edgePadding:{
        top:350,
        right:50,
        left:50,
        bottom:50
      }})

  }

  const selectedRes=(res) =>{
    setSelectedRestaurant(res)
    setModalFlag(true)
}

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        
        <MapView
        customMapStyle={hour ? mapStyle:null }
          ref={mapRef}
          style={{flex:1}}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}>

          {restaurantList.map((r, index) => (
            <Marker
              key={index}
              onPress={() =>selectedRes(r)}   
              coordinate={{
                latitude: r.lat,
                longitude: r.lng,
              }} 
              
                      
            >
              <Image style={img.image} source={require('../img/res.png')}/>
            </Marker>
          ))}
        </MapView>
        <View style={{position:"absolute"}}>
          <SearchBar onSearch={onSearchCity}/>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) =>i.toString()}
            data={cityList}
            renderItem={renderCities}

          />
          <RestaurantDetail 
            isVisible={modalFlag}
            restaurant={selectedrestaurant}
            onClose={() =>setModalFlag(false)}
          
          />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
