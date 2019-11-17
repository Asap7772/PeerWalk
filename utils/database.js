import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");

export default class Database {
    constructor() {
        // Initialize Firebase
        this.firebaseConfig = {
            apiKey: "AIzaSyBphJzFqoU1226G6k-osgkkSibiHD8Cf50",
            authDomain: "peerwalk-56316.firebaseapp.com",
            databaseURL: "https://peerwalk-56316.firebaseio.com",
            projectId: "peerwalk-56316",
            storageBucket: "peerwalk-56316.appspot.com",
        };
        firebase.initializeApp(this.firebaseConfig);
        this.state = {
            isReady: false
        };
    }


    createWalk = (userID, data) => {
        const db = firebase.firestore();
        let time = data["Time"];
        data["Time"] = firebase.firestore.Timestamp.fromDate(time);
        let setDoc = db.collection('walks').add(data)
            .then(ref => {
                let walkID = ref.id;
                this.joinWalk(userID,walkID);
                console.log('Walk created successfully!');
            });
    };

    joinWalk = (userID, walkID) => {
        const db = firebase.firestore();
        const user = db.collection("users").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walks"];
                    walksArr.push(walkID);
                    console.log("walkID pushed: ", walkID);
                    user.update({Walks: walksArr});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        const walk = db.collection("walks").doc(walkID);
        let walkDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walkers"];
                    walksArr.push(userID);
                    console.log("userID pushed: ", userID)
                    walk.update({Walkers: walksArr});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    leaveWalk = (userID, walkID) => {
        const db = firebase.firestore();
        const user = db.collection("users").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walks"];
                    console.log(walksArr);
                    walksArr = walksArr.filter(function(value, index, arr){
                        return value != walkID;
                    })
                    console.log("walkID deleted: ", walksArr);
                    user.update({Walks: walksArr});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        const walk = db.collection("walks").doc(walkID);
        let walkDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walkers"];
                    console.log(walksArr);
                    walksArr = walksArr.filter(function(value, index, arr){
                        return value != userID;
                    })
                    console.log("userID deleted: ", walksArr)
                    walk.update({Walkers: walksArr});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    distance = (lat1, lon1, lat2, lon2) =>{
        console.log("lat1 = ", lat1)
        console.log("lon1 = ", lon1)
        console.log("lat2 = ", lat2)
        console.log("lon2 = ", lon2)
        let radius = 6371* 0.621371; // Radius of the earth in km
        let dLat = (Math.PI/180)*(lat2-lat1);  // deg2rad below
        let dLon = (Math.PI/180)*(lon2-lon1);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((Math.PI/180)*(lat1)) * Math.cos((Math.PI/180)*(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        console.log("distance = ", radius * c)
        console.log("++++++++++++++++++++++++++++++++")
        return radius * c;
    }

    getNearbyWalks = async (location) => {
        let numWalks = 10;
        const latitude = location["Latitude"];
        const longitude = location["Longitude"]
        let km = 5;
        const latRadius = km/110.574;
        const longRadius = km/(111.32*Math.cos(latitude));

        const db = firebase.firestore();

        let walk_array = [];

        const walks = await db.collection("walks").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                walk_array.push([doc.id, doc.data()]);
            });
        });

        let compare = (a, b) => {
            let alat = a[1]["StartLat"]
            let alon = a[1]["StartLong"]
            let blat = b[1]["StartLat"]
            let blon = b[1]["StartLong"]
            let dist1 = Math.abs(this.distance(location["Latitude"], location["Longitude"], alat, alon))
            let dist2 = Math.abs(this.distance(location["Latitude"], location["Longitude"], blat, blon))

            if (dist1 > dist2){
                return 1
            }
            return -1
        }

        let sorted = walk_array.sort(compare)

        console.log(sorted)

        return sorted;
    }

    getUserWalkIDs = (userID) => {
        const db = firebase.firestore();
        const user = db.collection("users").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    console.log("Document successfully received!");
                    console.log(data["Walks"])
                    return data["Walks"]
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getWalk = (walkID) => {
        const db = firebase.firestore();
        const walk = db.collection("walks").doc(walkID);
        let getDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    return doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getProfile = (userID) => {
        const db = firebase.firestore();
        const user = db.collection("users").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    return doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }
}

