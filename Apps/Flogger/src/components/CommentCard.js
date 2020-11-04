import React, { useState, useEffect} from "react";
import { View, StyleSheet} from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import "firebase/firestore";

const CommentCard = (props) =>{
    return (
        <Card>
            <View
                style={{
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10
                    }}
                >
                    <Avatar
                        containerStyle={{ backgroundColor: '#1c1c1c'}}
                        rounded
                        size={25}
                        icon={{ name: "user", type: "font-awesome", color: "white" }}
                        activeOpacity={1}
                    />
                    <Text h4Style={{ fontSize: 14, paddingHorizontal: 10}} h4>{props.commentor}</Text>
                </View>
                <Card.Divider></Card.Divider>
                <Text Style={{ marginTop: 30 }}>{props.comment}</Text>
            </View>
        </Card>
    );
};


export default CommentCard;