import React, { useState, useEffect} from "react";
import { View, StyleSheet} from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import PostScreen from "./../screens/PostScreen";

import * as firebase from "firebase";
import "firebase/firestore";

const PostCard = (props) => {
  const user = firebase.auth().currentUser;
  const [Liked, setLiked] = useState(false);
  const [LikesCount, setLikesCount] = useState(0);
  const [CommentsCount, setCommentsCount] = useState(0);


  
  const getLikesCount = async (id)=>{
    firebase.firestore().collection('posts').doc(id).onSnapshot( async (doc)=>{
      let snap = doc.data();
      if(snap.likes !== undefined){
        setLikesCount(snap.likes.length);
      }else{
        alert("lol");
      }
    });
  }

  const getCommentsCount = async (id)=>{
    firebase.firestore().collection('posts').doc(id).onSnapshot( async (doc)=>{
      let snap = doc.data();
      if(snap.comments !== undefined){
        setCommentsCount(Object.keys(snap.comments).length);
      }else{
        alert("lol");
      }
    });
  }

  const addLike = async (id, userid) => {
    if(Liked == false){
      const doc = firebase.firestore().collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userid)
      }).then(async () => {
        setLiked(true);
      }).catch((error) => {
        alert(error);
      });
    }else{
      const doc = firebase.firestore().collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userid)
      }).then( async () => {
        setLiked(false);
      }).catch((error) => {
        alert(error);
      });
    }
  }


  useEffect(() => {
    getLikesCount(props.postId);
    getCommentsCount(props.postId);
  }, []);



  return (
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
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title= {"Like (" + LikesCount + ")"}
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
          onPress={ function () {
            // getLikes(props.postId);
            addLike(props.postId, user.uid);
          }}
        />
        <Button type="solid" title={"Comments (" + CommentsCount + ")"}
          onPress={ function () {
            props.navigation.navigate("Post",{
              postid: props.postId,
            });
          }}
        />
      </View>
    </Card>
  );
};

export default PostCard;
