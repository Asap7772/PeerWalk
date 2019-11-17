import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Questions extends Component {
    render(){
        return(
            <View style={{justifyContent: 'center', flex:1,  backgroundColor:"#0d47a1"}}>
                <View style={{justifyContent: 'center', alignItems: 'center',flex:0.3, backgroundColor:"#1e88e5",  shadowOffset: {width:5, height:5},shadowColor: 'black', shadowOpacity: 0.4, shadowRadius:20, borderBottomRightRadius:25,borderBottomLeftRadius:25,}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 15}}>Tejvir Jogani</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 15}}>
                        <Ionicons name="md-checkmark-circle" size={32} color="white" /> Berkeley, California</Text>
                        <Text style={{color: 'white', opacity: 0.8}}>Not the city you are in? Tap to change city.</Text>
                </View>
                <View style={{zIndex:-1, flex:0.7, borderTopEndRadius:0}}>
                    <Text style={{fontSize: 30, fontWeight:'bold', color:'white', marginLeft: 20, marginBottom:10, marginTop:20}}>Question</Text>
                    <View style={styles.card}>
                        <TextInput multiline={true} placeholder="What would you like to ask?" style={{fontSize: 20}}>

                        </TextInput>
                    </View>
                    <Text style={{fontSize: 30, fontWeight:'bold', color: 'white', marginBottom:10, marginTop:10, marginLeft: 20}}>Tags</Text>
                    <View style={{...styles.card, height:100}}>
                        <TextInput  multiline={true} placeholder="Give your question some tags" style={{fontSize: 15}}>

                        </TextInput>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.submitButton}>
                        <Text style={{fontSize:15, fontWeight: 'bold', color: 'white'}}>ASK AROUND!</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        height: 200,
        marginHorizontal: 20,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowOffset: {width:3, height:3},
        shadowColor: 'black',
        shadowOpacity: 0.4
    },
    submitButton: {
    backgroundColor: "#1e88e5",
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowOffset: {width:3, height:3},
    shadowColor: 'black',
    shadowOpacity: 0.4, 
marginTop: 15}
})