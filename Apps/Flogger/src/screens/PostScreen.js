import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext} from "../providers/AuthProvider";

const PostScreen = (props) => {
    let user = firebase.auth().currentUser;
    let userid = user.uid;
    let username = user.displayName;
    let postId = props.route.params.postid;
    const [Post, setPost] = useState({});
    const [Comment, setComment] = useState("");
    let dict = {};
    let [allc, setallc] = useState([]);

    const postComment = async (userid)=>{
        if(Comment != ""){
            dict = {
                "comment_poster_id": userid,
                "commentor" : username,
                "comment_body": Comment,
            }
            const doc = firebase.firestore().collection('posts').doc(postId).update({
                comments: firebase.firestore.FieldValue.arrayUnion(dict)
            }).then(()=>{
                alert("Commented successfully");
            });
        }else{
            alert("Field is empty!");
        }
    }

    const loadPost = async (postId)=>{
        firebase.firestore().collection('posts').doc(postId).onSnapshot((doc) => {
            let snap = doc.data();
            setPost(snap);
            setallc(snap.comments)
            //allc = snap.comments;
            //console.log(allc[0].comment_body);
        });
    }

    useEffect(() => {
        loadPost(postId);
    }, []);

    
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Card>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                containerStyle={{ backgroundColor: "#ffab91" }}
                                rounded
                                icon={{ name: "user", type: "font-awesome", color: "black" }}
                                activeOpacity={1}
                            />
                            <Text h4Style={{ padding: 10 }} h4>
                                {Post.author}
                            </Text>
                        </View>
                        <Text
                            style={{
                                paddingVertical: 10,
                            }}
                        >
                            {Post.body}
                        </Text>
                        <Card.Divider />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Input
                                inputStyle={styles.inputStyle}
                                placeholder='Comment'
                                onChangeText={function (currentInput) {
                                    setComment(currentInput);
                                }}
                            />
                        </View>
                        <Button type="solid" title="Post Comment"
                            onPress={function () {
                                postComment(userid);
                            }}
                        />
                        <FlatList
                            data={allc}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <Text>{item.commentor}</Text>
                                        <Text>{item.comment_body}</Text>
                                    </View>
                                );
                            }}
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

export default PostScreen;
