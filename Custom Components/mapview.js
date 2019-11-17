import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modalbox';
import { ScrollView } from 'react-native-gesture-handler';
import getDirections from 'react-native-google-maps-directions'
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';


const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCIGxaD3x6WSy4CYTPAv2X2fXT-6CjKeLQ';


export default class CardStuff extends React.PureComponent {
    render(){
        return(

        <MapView style={{
            flex: 1
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
              <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
        />
        
      </MapView>


        );
    }
}