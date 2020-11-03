import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";

import { AuthContext, AuthProvider } from './../providers/AuthProvider'
import * as firebase from "firebase";
import "firebase/firestore";

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
            <AuthContext.Consumer>
                {(auth)=>(
                    <View style={styles.viewStyle}>
                    <Card>
                        <Image style={styles.tinyLogo} source={require('./../../assets/flogger_icon.png')} />
                        <Card.Divider />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
                            placeholder="Name"
                            onChangeText={function (currentInput) {
                                setName(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
                            placeholder="Student ID"
                            onChangeText={function (currentInput) {
                                setSID(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
                            placeholder="E-mail Address"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}
                        />

                        <Input
                            inputStyle={styles.inputStyle}
                            placeholder="Password"
                            leftIcon={<Feather name="key" size={24} color="black" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="  Sign Up!"
                            type="solid"
                            onPress={function () {
                                if(Name && SID && Password && Email){
                                    firebase.auth().createUserWithEmailAndPassword(Email, Password).then((userCreds)=>{
                                        userCreds.user.updateProfile({displayName: Name});
                                        firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                                            name: Name,
                                            sid: SID,
                                            email: Email,
                                        }).then(()=>{
                                            alert("Account created successfully!");
                                            console.log(userCreds.user);
                                            props.navigation.navigate("SignIn");
                                        }).catch((error)=>{
                                            alert(error);
                                        });
                                    }).catch((error)=>{
                                        alert(error);
                                    })
                                }else{
                                    alert("Fields can not be empty!")
                                }
                            }}
                        />
                        <Button
                            buttonStyle={styles.signupbuttonStyle}
                            titleStyle={styles.textColor}
                            type="clear"
                            title="  Already have an account?"
                            onPress={function () {
                                props.navigation.navigate("SignIn");
                            }}
                        />
                    </Card>
                    </View>
                )}
            </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        margin: 5,
    },

    buttonStyle: {
        backgroundColor: '#1C1C1C',
        marginTop: 15,
        marginBottom: 5,
    },

    textColor: {
        color: "#1C1C1C",
    },

    signupbuttonStyle: {
        marginTop: 5,
        marginBottom: 10,
    },

    tinyLogo: {
        width: 52,
        height: 32,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 40,

    },
    logo: {
        width: 66,
        height: 58,
    },

    viewStyle:{
        backgroundColor: "#1C1C1C",
        flex:1,
        justifyContent:'center',
    }
});
export default SignUpScreen;