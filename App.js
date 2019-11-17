import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Database from "./utils/database";
import Login from "./utils/login";
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo';
import LoginPage from './app/index';
import CardClass from './app/dashboard'
import Example from './app/test'
import {Navigator} from 'react-native-deprecated-custom-components';


export default class App extends React.Component {
    constructor() {
        super();

    }
    render(){
        return <CardClass/>
    }

    // render(){
    //     return (<Navigator initialRoute={{id: 'Page 1'}}
    //     renderScene = {this.navigatorRenderScene}/>);
    // }
    //
    // navigatorRenderScene = (route, Navigator) => {
    //     switch(route.id){
    //         case 'Page 1':
    //             return (<LoginPage navigator = {navigator}/>)
    //         case 'Page 2':
    //             return (<CardClass/>)
    //     }
    // }

}
