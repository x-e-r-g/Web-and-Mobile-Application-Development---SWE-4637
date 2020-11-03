import React, { useState, useEffect} from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext} from "../providers/AuthProvider";

const ProfileScreen = (props) => {
    const [Profile, setProfile] = useState({});
    const user = firebase.auth().currentUser;

    const loadProfile = async ()=>{
        const doc = firebase.firestore().collection('users').doc(user.uid).get().then((doc)=>{
            setProfile(doc.data());
            console.log(doc.data());
        })
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Card>
                        <Card.Divider />
                        <Avatar
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <Text h2>{Profile.name}</Text>
                        <Text h4>{Profile.name}</Text>
                        <Button
                            buttonStyle={styles.signupbuttonStyle}
                            titleStyle={styles.textColor}
                            title="Edit Profile"
                            type='clear'
                            onPress={
                                function () {
                                    props.navigation.navigate("SignUp");
                                }
                            }
                        />
                    </Card>            
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        backgroundColor: "#1C1C1C",
        flex: 1,
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 20,
        color: "black",
        marginVertical: 5,
    },
    header2TextStyle: {
        fontSize: 16,
        color: "black",
        marginVertical: 5,
    },
    DisplayImage: {
        margin: 20,
        justifyContent: "space-evenly",
        alignSelf: "center",
        width: 240,
        height: 320,
        borderColor: "#00C6FF",
        borderWidth: 2,
    },
});

export default ProfileScreen;
