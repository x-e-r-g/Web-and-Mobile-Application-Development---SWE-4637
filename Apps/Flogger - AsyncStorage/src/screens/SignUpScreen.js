import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { FontAwesome, Feather, Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext, AuthProvider } from './../providers/AuthProvider';
import { storeProfileJSON } from "./../functions/ASyncPostStorageFunction";
const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [EmailValidation, setEmailValidation] = useState(false);
    const [Password, setPassword] = useState("");
    const [RePassword, setRePassword] = useState("");
    const [CurrentAddress, setCurrentAddress] = useState("");
    const [WorkPlace, setWorkPlace] = useState("");
    const [BirthDate, setBirthDate] = useState("1997-12-03");
    const [ImageBase64, setImageBase64] = useState("");

    const validateEmail = (input) => {
        var emailRegExp = /\S+@\S+\.\S+/;
        if (emailRegExp.test(input) == true)
            setEmailValidation(true)
        else
            setEmailValidation(false)
    }

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
                            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
                            placeholder="E-mail Address"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                                validateEmail(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<Entypo name="location-pin" size={24} color="black" />}
                            placeholder="Current Address"
                            onChangeText={function (currentInput) {
                                setCurrentAddress(currentInput);
                            }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            leftIcon={<MaterialCommunityIcons name="office-building" size={24} color="black" />}
                            placeholder="Workplace Location"
                            onChangeText={function (currentInput) {
                                setWorkPlace(currentInput);
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

                        <Input
                            inputStyle={styles.inputStyle}
                            placeholder="Confirm Password"
                            leftIcon={<Feather name="key" size={24} color="black" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setRePassword(currentInput);
                            }}
                        />

                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="  Sign Up!"
                            type="solid"
                            onPress={function () {
                                if (Name.length > 0 && EmailValidation == true && CurrentAddress.length > 0 && Password.length >= 6 && Password === RePassword ){
                                    let user = {
                                        profile_id: Email,
                                        name: Name,
                                        email: Email,
                                        password: Password,
                                        address: CurrentAddress,
                                        workplace: WorkPlace,
                                        image: ImageBase64,
                                        birth_date: BirthDate,
                                        posts: []
                                    }
                                    storeProfileJSON(Email, user);
                                    alert("You have signed up successfully");
                                    props.navigation.navigate("SignIn");
                                }else{
                                    alert("Check empty fields and Match Passwords")
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