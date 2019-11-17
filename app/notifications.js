import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../Custom Components/customcard'
import NewModal from '../Custom Components/secondmodal';

export default class NotificationRender extends Component {
    constructor(props) {
        super(props);
        this._onPressShowAnswer = this._onPressShowAnswer.bind(this)
      }
      _onPressShowAnswer(){
        this.refs.addModal.showAddModal()
      }
    render(){
        
        return(
            <View style={{flex:1, justifyContent:'center', backgroundColor:"#0d47a1"}}>
            <View style={{flex:0.4, backgroundColor:"#1e88e5",  shadowOffset: {width:5, height:5},shadowColor: 'black', shadowOpacity: 0.4, shadowRadius:20, borderBottomRightRadius:25,borderBottomLeftRadius:25,}}>
                <Text style={{fontSize:40, fontWeight: 'bold', color: 'white', marginLeft: 20, marginTop: 40}}> Current Walk </Text>
                <FlatList
                        data={[{from: 'Moffit', to: "Sather Hall", start:"8:00pm", end: "3 minutes from you"}]}
                        keyExtractor= {(item, index) => index.toString()}
                        renderItem={({item})=><Card from={item.from} to={item.to} start={item.start} end={item.end} functioncall={this._onPressShowAnswer}/>}
                    />
                </View>
            <View style={{ flex:0.6, borderTopEndRadius:0}}>
                  <Text style={{fontSize: 40, fontWeight: 'bold', marginTop: 10, marginLeft: 20, marginBottom: 10, color: 'white'}}>Scheduled Walks</Text>
                    <FlatList
                        data={[{from: 'Moffit', to: "Sather Hall", start:"6:00PM", end: "3 minutes from you"},
                            {from: 'Haas', to: "Soda Hall", start:"8:00pm", end: "12 minutes from you"},
                            {from: 'Haas', to: "Moffit", start:"7:00pm", end: "3 minutes from you"},
                            {from: 'Minor Hall', to: "Soda Hall", start:"8:00pm", end: "6 minutes from you"},
                            {from: 'Haas', to: "Soda Hall", start:"8:00pm", end: "12 minutes from you"},
                            {from: 'Cory Hall', to: "Dwinnelle Hall", start:"11:00pm", end: "12 minutes from you"}]}
                        keyExtractor= {(item, index) => index.toString()}
                        renderItem={({item})=><Card from={item.from} to={item.to} start={item.start} end={item.end} functioncall={this._onPressShowAnswer}/>}
                    />
                  
                  <NewModal ref={"addModal"} parentFlatList={this}>
                    </NewModal>

           
                </View>
                </View>
        );
    }
}