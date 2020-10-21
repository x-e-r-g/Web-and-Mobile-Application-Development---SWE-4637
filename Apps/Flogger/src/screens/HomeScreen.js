import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';

import { AuthContext, AuthProvider } from './../providers/AuthProvider'

const HomeScreen = ()=>{
    return(
            <AuthContext.Consumer>
                {(auth)=>(
                    <View>
                        <Text>Welcome to Homescreen</Text>
                        <Button
                            title="Log out"
                            type='solid'
                            onPress={
                                function () {
                                    auth.setIsLoggedIn(false);
                                }
                            }
                        />
                    </View>
                )}
            </AuthContext.Consumer>
    );
}
export default HomeScreen;