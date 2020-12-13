import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList} from "react-native";
import { Card, Button, Text, Avatar, Input , Header} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";
import { AuthContext} from "../providers/AuthProvider";
import CommentCard from "../components/CommentCard";
import { TouchableOpacity } from "react-native-gesture-handler";

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

    const deleteComment = async (item) => {
        if(user.uid == Post.userId || user.uid == item.comment_poster_id){
            firebase.firestore().collection('posts').doc(postId).update({
                comments: firebase.firestore.FieldValue.arrayRemove(item)
            }).then(() => {
                alert("Comment deleted successfully");
            }).catch((error) => {
                alert(error);
            });
        }
        else{
            alert("You don't have the authority to delete this comment");
        }
    }

    useEffect(() => {
        loadPost(postId);
    }, []);

    
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Header
                        containerStyle={{
                        backgroundColor: '#1c1c1c',
                        }}
                        centerComponent={{ text: "Flogger", style: { color: "#fff", fontSize: 20 } }}
                    />
                    <Card>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                containerStyle={{ backgroundColor: '#1c1c1c' }}
                                rounded
                                size={45}
                                icon={{ name: "user", type: "font-awesome", color: "white" }}
                                activeOpacity={1}
                            />
                            <Text h4Style={{ padding: 10 }} h4>
                                {Post.author}
                            </Text>
                        </View>
                        <Text
                            style={{ fontSize: 18,
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
                        buttonStyle={{backgroundColor: '#1c1c1c'}}
                            onPress={function () {
                                postComment(userid);
                            }}
                        />
                    </Card>  
                    <FlatList
                        data={allc}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onLongPress={()=>{
                                    deleteComment(item);
                                }}>
                                    <View>
                                        <CommentCard
                                            commentor={item.commentor}
                                            comment={item.comment_body}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
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
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default PostScreen;
