import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Database from "./utils/database";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            emailText: "reinaw1012@berkeley.edu",
            passwordText: "654321",
            userData: {}
        };
        console.log("App here!");
    }
    db = new Database();
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Login Page!</Text>
                <Button
                    title="Joinwalk"
                    onPress={() => this.db.getUserWalkIDs("sbanka@berkeley.edu")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
