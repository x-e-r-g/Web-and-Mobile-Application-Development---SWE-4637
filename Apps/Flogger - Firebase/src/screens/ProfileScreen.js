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
        const doc = await firebase.firestore().collection('users').doc(user.uid).get().then((doc)=>{
            setProfile(doc.data());
            console.log(doc.data());
        })
    }

    const deleteProfile = async () => {
        firebase.firestore().collection("users").doc(user.uid).delete().then(function () {
            user.delete().then(function () {
                firebase.auth().signOut().then(() => {
                }).catch((error) => {
                    alert(error);
                });
            }).catch(function (error) {
                alert(error);
            });
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        const doc = await firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
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
                        <Avatar
                            containerStyle={styles.avatarStyle}
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            size={200}
                            onAccessoryPress={() => Alert.alert("change avatar")}
                            overlayContainerStyle={{ backgroundColor: "#1C1C1C" }}
                            showAccessory
                            accessory={{ containerStyle: { backgroundColor: "#1C1C1C" } }}
                        />
                        <Card.Divider/>
                        <Text h4>{Profile.name}</Text>
                        <Text h5>Student ID: {Profile.sid}</Text>
                        <Text h5>E-Mail: {Profile.email}</Text>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.textColor}
                            title="Edit Profile"
                            type='clear'
                            onPress={
                                function () {
                                    props.navigation.navigate("SignUp");
                                }
                            }
                        />
                        <Button
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.textColor}
                            title="Delete Profile"
                            type='clear'
                            onPress={
                                function () {
                                    deleteProfile(auth);
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                }
                            }
                        />        
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
    avatarStyle: {
        alignSelf: "center",
        margin: 20,
    },
    buttonStyle: {
        margin: 5,
    },
    viewStyle: {
        padding: 30,
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'center',
    },
});

export default ProfileScreen;
