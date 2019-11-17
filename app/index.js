import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Svg,{Image, Circle, ClipPath} from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Login from "../utils/login";
import Database from "../utils/database";
import { createStackNavigator, createAppContainer } from 'react-navigation';
const { width, height } = Dimensions.get('window');


const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class LoginPage extends Component {
    constructor() {
        super();
    
        this.buttonOpacity = new Value(1);
        this.loginObj = new Login();
        this.db = new Database();
        this.onStateChange = event([
          {
            nativeEvent: ({ state }) =>
              block([
                cond(
                  eq(state, State.END),
                  set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                )
              ])
          }
        ]);

        this.onCloseState = event([
            {
              nativeEvent: ({ state }) =>
                block([
                  cond(
                    eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                  )
                ])
            }
          ]);
    
        this.buttonY = interpolate(this.buttonOpacity, {
          inputRange: [0, 1],
          outputRange: [100, 0],
          extrapolate: Extrapolate.CLAMP
        });
    
        this.bgY = interpolate(this.buttonOpacity, {
          inputRange: [0, 1],
          outputRange: [-height / 1.2 -50, 0],
          extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex =  interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
          });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
          });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
          });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
          });
      }

    login = async () => {
        await this.loginObj.logIn()
        await console.log("login", this.loginObj.json)
        // document.location.href = './dashboard'
    }



    render() {
        return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#BBDEFB',
                justifyContent: 'flex-end'
              }}
            >
            
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFill,
                  transform: [{ translateY: this.bgY }]
                }}
              >
            <Svg height ={height+50} width={width}>
                <ClipPath id="clip" >
                    <Circle r={height+50} cx={width/2}/>

                </ClipPath>
                <Image
                  href={require('../assets/bg.jpg')}
                  width={width}
                  height={height+50}
                  preserveAspectRatio="XMidYMid slice"
                  clipPath = 'url(#clip)'
                />
            </Svg>
            
              </Animated.View>

                <KeyboardAvoidingView style={{flex:-1}}>
              <View style={{ height: height / 2, justifyContent: 'center' }}>
                <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                  <Animated.View
                    style={{
                      ...styles.button,
                      opacity: this.buttonOpacity,
                      transform: [{ translateY: this.buttonY }]
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN </Text>
                  </Animated.View>
                </TapGestureHandler>
                <Animated.View
                  style={{
                    ...styles.button,
                    opacity: this.buttonOpacity,
                    transform: [{ translateY: this.buttonY }]
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN UP </Text>
                </Animated.View>
                <Animated.View style={{zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform:[{translateY: this.textInputY}], height:height/1.2, ...StyleSheet.absoluteFill, top:null,justifyContent: 'center'}}>
                <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                
                    <Animated.View style={styles.closeButton}>
                        <Animated.Text style={{fontSize: 15, transform:[{rotate:concat(this.rotateCross, 'deg')}]}}>X</Animated.Text>
    
                    </Animated.View>

                </TapGestureHandler>
                
                  <TextInput placeholder="EMAIL"  style={styles.textInput} placeholderTextColor='black'/>
                  <TextInput placeholder="PASSWORD" secureTextEntry={true} style={styles.textInput} placeholderTextColor='black'/>
                  <Animated.View style={styles.button} >
                        
                        <Text style={{fontSize: 20,fontWeight:'bold'}}>SIGN IN </Text>
                  </Animated.View>
                    <TouchableOpacity onPress={this.login} >
                  <Animated.View style={{...styles.button, backgroundColor: "#1778F2"}}>
                        <Text style={{fontSize: 20,fontWeight:'bold', color:'white'}}> SIGN IN WITH FACEBOOK </Text>
                  </Animated.View>
                    </TouchableOpacity>
                 
                </Animated.View>
              </View>
              </KeyboardAvoidingView>
            </View>
            
            
        
            
          );
        }
      }
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "white",
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.4
    },
    textInput:{
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        borderWidth: 0,
        marginHorizontal: 20, 
        paddingLeft: 20, 
        marginVertical: 10, 
        borderColor:'rgba(0,0,0,0.2)',
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.4
    },
    closeButton:{
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20, 
        alignItems: 'center',
        justifyContent: 'center', 
        position: 'absolute',
        top: -20,
        left: width/2 - 20,
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.4
     }
})