import React from 'react';
import { Header } from "react-native-elements";

import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";

const HeaderHome = (props)=>{
    return (
        <AuthContext.Consumer>
            {(auth)=>{
                <Header
                    leftComponent={{
                        icon: "menu",
                        color: "#fff",
                        onPress: props.DrawerFunction,
                    }}
                    centerComponent={{text: "Flogger", style: { color: "#fff"} }}
                    rightComponent={{
                        icon: "lock-outline",
                        color: "#fff",
                        onPress: function() {
                            firebase.auth().signOut().then(()=>{
                                auth.setIsLoggedIn(false);
                                auth.setCurrentUser({});
                            }).catch((error)=>{
                                alert(error);
                            });
                        },
                    }}
                />
            }}
        </AuthContext.Consumer>
    );
};

export default HeaderHome;