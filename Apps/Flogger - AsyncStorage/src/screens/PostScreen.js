import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator} from "react-native";
import { Card, Button, Text, Avatar, Input , Header} from "react-native-elements";
import { AuthContext} from "../providers/AuthProvider";
import CommentCard from "../components/CommentCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getPostJSON, storePostJSON } from "./../functions/ASyncPostStorageFunction"

const PostScreen = (props) => {
    var post = props.route.params.post;
    var allPost = [];
    var allcomments = [];
    //let tempPosts = [];

    const [Comment, setComment] = useState("");
    const [AllComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);

    // const loadAllPost = async () => {
    //     setLoading(true);
    //     await getPostJSON().then((value)=> {
    //         tempPosts = value;
    //     });
    //     setAllPost(tempPosts);
    //     setLoading(false);
        
    //}

    const updatePost = (post_id, comments) => {
        allPost = props.route.params.allPost;
        console.log("in updatePost function showing all the posts", allPost);
        for (var i in allPost) {
            if (allPost[i].post_id == post_id) {
                allPost[i].comments = comments; 
                break; //Stop this loop, we found it!
            }
        }
        storePostJSON([allPost]);
        //setLoading(false);
    }
    
    useEffect(() => {
        //loadAllPost();
        allPost = props.route.params.allPost;
        setAllComments(post.comments);
        console.log("In post screen :", allPost);
    }, []);

    if (!loading) {
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
                                <View
                                    style={{
                                        flexDirection: "column",
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <Text h4Style={{ fontSize: 20 }} h4>{post.author}</Text>
                                    <Text h5>{post.posted_at}</Text>
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    paddingVertical: 10,
                                }}
                            >
                                {post.post_body}
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
                                buttonStyle={{ backgroundColor: '#1c1c1c' }}
                                onPress={
                                    ()=> {
                                        if(Comment != ""){
                                            let commentobj = {
                                                comment_author: post.author,
                                                comment_body: Comment,
                                            }
                                            var prevComments = post.comments;
                                            console.log("Post Comment Buton showing prev: ", prevComments);
                                            if(prevComments == undefined){
                                                allcomments = commentobj;
                                            }
                                            else{
                                                allcomments = [commentobj, ...prevComments];
                                            }
                                            console.log("Post Comment Buton showing allcomments: ", allcomments);
                                            updatePost(post.post_id, allcomments); 
                                            setAllComments(allcomments);
                                        }
                                        else{
                                            alert("Field can't be empty");
                                        }
                                    }
                                }
                            />
                        </Card>
                        <FlatList
                            data={AllComments}
                            //key={item.comment_body}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onLongPress={() => {
                                    }}>
                                        <View>
                                            <CommentCard
                                                commentor={item.comment_author}
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
    }
    else{
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#000000" animating={true} />
            </View>
        );
    }    
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
