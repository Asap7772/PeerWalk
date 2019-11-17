import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screen = Dimensions.get('window')
export default class Page extends Component {
    render(){
        return(
            <View style={{justifyContent: 'center', flex:1,  backgroundColor:"#0d47a1"}}>
                <View style={{justifyContent: 'center', alignItems: 'center',flex:0.3, backgroundColor:"#1e88e5",  shadowOffset: {width:5, height:5},shadowColor: 'black', shadowOpacity: 0.4, shadowRadius:20, borderBottomRightRadius:25,borderBottomLeftRadius:25,}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 15}}>Tejvir Jogani</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 15}}>
                        <Ionicons name="md-checkmark-circle" size={32} color="white" /> Berkeley, California</Text>
                        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 10}}>Create Walk</Text>
                </View>
                <View style={{zIndex:-1, flex:0.7, borderTopEndRadius:0}}>
                    
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    email:{
        backgroundColor:"white",
        height: 50,
        width: screen.width - 40,
        borderRadius: 15,
        padding: 10,
        marginLeft: 20

    }
})