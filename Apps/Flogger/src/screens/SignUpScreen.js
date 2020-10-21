import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import { AuthContext, AuthProvider } from './../providers/AuthProvider'

const SignUpScreen = (props) => {
    return (
            <AuthContext.Consumer>
                {(auth)=>(
                    <View style={styles.viewStyle}>
                        <Card>
                            <Card.Title>Welcome to FLOGGER!!</Card.Title>
                            <Card.Divider />
                            <Input
                                leftIcon={<FontAwesome name="envelope-o" size={18} color="black" />}
                                placeholder='E-mail Address' />

                            <Input
                                leftIcon={<Feather name="lock" size={18} color="black" />}
                                placeholder='Password' />

                            <Button
                                title='Sign Up'
                                type='solid'
                            />
                            <Button
                                title="Already have an account? Sign In!"
                                type='clear'
                                onPress={
                                    function () {
                                        props.navigation.navigate("SignIn");
                                    }
                                }
                            />
                        </Card>
                    </View>
                )}
            </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        justifyContent:'center',
    }
});
export default SignUpScreen;