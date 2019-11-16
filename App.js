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
    }
    db = new Database();
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Login Page!</Text>
                <Button
                    title="Get User Walk IDs"
                    onPress={() => this.db.getUserWalkIDs("sbanka@berkeley.edu")}
                />
                <Button
                    title="Get Walk"
                    onPress={() => this.db.getWalk("dCjQm6tEWiM5P1Wp7Y3Q")}
                />
                <Button
                    title="Get Profile"
                    onPress={() => this.db.getProfile("sbanka@berkeley.edu")}
                />
                <Button
                    title="CreateWalk"
                    onPress={() => this.db.createWalk("sbanka@berkeley.edu",{
                        Start: [37.00, 121.00],
                        End: [47.00, 122.00],
                        Walkers: ["sbanka@berkeley.edu", "asap7772@berkeley.edu", "reinaw1012@berkeley.edu", "tjogani@berkeley.edu"],
                        Time: Date(2016, 12, 17, 0, 0, 0, 0)
                    })
                    }
                />
                <Button
                    title="Joinwalk"
                    onPress={() => this.db.joinWalk("sbanka@berkeley.edu", "idcMIXDK3sQfz0PhRCyZ")}
                />
                <Button
                    title="LeaveWalk"
                    onPress={() => this.db.leaveWalk("sbanka@berkeley.edu","idcMIXDK3sQfz0PhRCyZ")}
                />
                <Button
                    title="GetNearbyWalks"
                    onPress={() => this.db.getNearbyWalks({
                        Latitude: 33,
                        Longitude: 120
                    })}
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
