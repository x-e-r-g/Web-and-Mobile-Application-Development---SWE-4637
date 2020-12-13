import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import {
    Card,
    Button,
    Input,
    Header,
} from "react-native-elements";
import moment from "moment";
import PostCard from "./../components/PostCard";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo"
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storePostJSON, addPostJSON, getPostJSON, removeData } from "./../functions/ASyncPostStorageFunction";

const HomeScreen = (props) => {
    // const netinfo = useNetInfo();
    // if(netinfo.type!='unknown' && !netinfo.isInternetReachable){
    //     alert("No Internet");
    // }
    const [AllPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [CurrentPost, setCurrentPost] = useState("");

    let clearAsyncStorage = async () => {
        AsyncStorage.clear();
        alert("Cleared");
    }
    
    const loadAllPost = async () => {
        setLoading(true);
        ///clearAsyncStorage();
        let tempPosts = await getPostJSON();
        setAllPost(tempPosts);
        setLoading(false);
        console.log("temps: ",typeof tempPosts);
        console.log("Alls: ", AllPost);
    }

    const deleteItemById = id => {
        const filteredData = AllPost.filter(item => item.post_id !== id);
        console.log("deletedItem");
        console.log(filteredData);
        return filteredData;
    }

    useEffect(() => {
        //clearAsyncStorage();
        loadAllPost();
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
                            leftComponent={{
                                icon: "menu",
                                color: "#fff",
                                onPress: function () {
                                    props.navigation.toggleDrawer();
                                },
                            }}
                            centerComponent={{ text: "Flogger", style: { color: "#fff" , fontSize: 20} }}
                            rightComponent={{
                                icon: "lock-outline",
                                color: "#fff",
                                onPress: function () {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                },
                            }}
                        />
                        <Card>
                            <Input
                                placeholder="What's On Your Mind?"
                                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                                on onChangeText={(currentInput)=>{
                                    setCurrentPost(currentInput)
                                }}
                            />
                            <Button title="Post" type="outline" 
                            titleStyle={{color: "#1c1c1c"}}
                            onPress={function () {
                                setLoading(true);
                                if(CurrentPost == ""){
                                    alert("Filed is Empty!");
                                }else{
                                    let integer = 0
                                    let id = "post" + integer;
                                    if (AllPost == undefined) {
                                        integer = integer + 1;
                                        id = "post" + integer;
                                    }
                                    else {
                                        integer = integer + AllPost.length + 1
                                        id = "post" + integer;
                                    }
                                    let post = {
                                        author: auth.CurrentUser.name,
                                        authorid: auth.CurrentUser.profile_id,
                                        post_body: CurrentPost,
                                        post_id: id,
                                        posted_at: moment().format("DD MMM, YYYY"),
                                        likes: [],
                                        comments: []
                                    }
                                    if (AllPost == undefined) {
                                        setAllPost([post]);
                                        storePostJSON([post]);
                                        setLoading(false);
                                    } else {
                                        setAllPost([post, ...AllPost]);
                                        addPostJSON(post);
                                        setLoading(false);
                                    }
                                    setCurrentPost("");
                                    setLoading(false);
                                }
                            }} />
                        </Card>

                        <FlatList
                            data={AllPost}
                            keyExtractor={(item) => item.post_id}
                            renderItem={function ({ item }) {
                                return (
                                    <TouchableOpacity onLongPress={ async ()=> {
                                        setLoading(true);
                                        if (AllPost.length == 1) {
                                            removeData("Posts");
                                            setAllPost([]);
                                        }
                                        else {
                                            setAllPost(deleteItemById(item.post_id));
                                            storePostJSON([AllPost]);
                                        }
                                        setLoading(false);
                                    }}>
                                        <PostCard
                                            user_name = {auth.CurrentUser.name}
                                            user_email = {auth.CurrentUser.email}
                                            post_id = {item.post_id}
                                            author = {item.author}
                                            author_id = {item.author_id}
                                            posted_at = {item.posted_at}
                                            body = {item.post_body}
                                            navigation = {props.navigation}
                                            post = {item}
                                            allPost = {AllPost}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                )}
            </AuthContext.Consumer>
        );
    } else {
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
    },
});

export default HomeScreen;
