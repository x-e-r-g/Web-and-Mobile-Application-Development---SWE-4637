import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Button, Avatar, Header } from "react-native-elements";
import {
    Title,
    Caption,
} from 'react-native-paper';
import { AuthContext } from "../providers/AuthProvider";
import { FontAwesome, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { removeData } from "../functions/ASyncPostStorageFunction";

const ProfileScreen = (props) => {
    const [Profile, setProfile] = useState({});

    return(
         <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header
                            containerStyle={{
                                backgroundColor: '#1c1c1c',
                            }}
                            leftComponent={{
                                icon: "menu",
                                color: "#fff",
                                onPress: function () {
                                    props.navigation.toggleDrawer();
                                },
                            }}
                            centerComponent={{ text: "Flogger", style: { color: "#fff", fontSize: 20 } }}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "#fff",
                                onPress: function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                },
                            }}
                />
                <ImageBackground 
                            source={{ uri:'https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg',}} 
                style={{height:200,width:400}}>
                    <View style={{paddingHorizontal:140,paddingVertical:140}}>
                        <Avatar
                    rounded
                    size={120}
                    avatarStyle={{ borderWidth: 5, borderColor: 'white' }}
                    source={{
                        uri:'https://st2.depositphotos.com/30638274/42448/v/450/depositphotos_424481138-stock-illustration-abstract-line-drawing-human-face.jpg',
                }}
                />
                        </View>
                    </ImageBackground>
                    
                    <View style={{alignItems:'center',marginTop:65,marginLeft:10}}>
                            <Title style={styles.title}>{auth.CurrentUser.name}</Title>
                            <Caption style={styles.caption}>{auth.CurrentUser.email}</Caption>
                    </View>
                
                <View style={{
                    margin:30}}>   
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <Feather name="map-pin" size={24} color="#000000" />
                            <Text style={{ marginLeft: 20, color: "#000000", fontSize: 18}}>{auth.CurrentUser.address == null || auth.CurrentUser.address == "" ? "No value set yet" : "Stays at " + auth.CurrentUser.address}</Text>
                    </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <FontAwesome name="birthday-cake" size={24} color="#000000" />
                            <Text style={{ marginLeft: 20, color: "#000000", fontSize: 18 }}>{auth.CurrentUser.birth_date == null || auth.CurrentUser.birth_date == "" ? "No value set yet" : "Born on " + auth.CurrentUser.birth_date}</Text>
                    </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <FontAwesome name="institution" size={24} color="#000000" />
                            <Text style={{ marginLeft: 20, color: "#000000", fontSize: 18}}>{auth.CurrentUser.workplace == null || auth.CurrentUser.workplace == "" ? "No value set yet" : "Works at " + auth.CurrentUser.workplace}</Text>
                    </View>
                </View>
                <View style={{alignSelf: "center"}}>
                    <Button
                    icon={<AntDesign name="deleteuser" size={24} color="white" />}
                    buttonStyle={{backgroundColor:'#000000'}}
                    containerStyle={{width:150,marginLeft:30,marginRight:10,}}
                    titleStyle={{marginLeft:5}}
                    title="Delete"
                    type='solid'
                    onPress={function (){
                        let key= auth.CurrentUser.email;
                        removeData(key);
                        auth.setIsLoggedIn(false);
                        auth.setCurrentUser({});
                        alert("Profile Deleted");
                    }}
                    />
                </View>

            </View>)}
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
