import React, { useState, useEffect} from "react";
import { View, StyleSheet} from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { format } from 'date-fns';

const PostCard = (props) => {
  const [Liked, setLiked] = useState(false);
  const [LikesCount, setLikesCount] = useState(0);
  const [CommentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    console.log("in post card the post: ", props);
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
          containerStyle={{ backgroundColor: "#1C1C1C", marginTop: 10 }}
          rounded
          size={50}
          icon={{ name: "user", type: "font-awesome", color: "white" }}
          activeOpacity={1}
        />
        <View 
          style={{
            flexDirection: "column",
            paddingHorizontal: 10,
          }}
        >
          <Text h4Style={{fontSize: 20}} h4>{props.post.author}</Text>
          <Text h5>{props.post.posted_at}</Text>
        </View>
      </View>
        <Text
          style={{
            padding: 5,
            marginBottom: 10,
            fontSize: 18,
          }}
        >
          {props.post.post_body}
        </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          titleStyle={{color: "#1c1c1c"}}
          type="outline"
          title={"Like"}
          icon={<AntDesign name="like2" size={24} color="#1c1c1c" />}
        />
        <Button type="solid" title={"Comments"}
          buttonStyle={{backgroundColor: "#1c1c1c"}}
          onPress={function() {
            let temp = {
              post : props.post,
              allPost : props.allPost,
            }
            props.navigation.navigate("Post", temp);
          }}
        />
      </View>
    </Card>
  );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    userInfo:{
        marginTop:20,
        paddingHorizontal:30,
        marginBottom:25,
    },
    title:{
        fontSize:24,
        fontWeight:"bold"
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:'500',
    },
    row:{
        flexDirection:'row',
        marginBottom:15,
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        marginHorizontal:10,
        shadowOpacity:50,
        elevation:10
    },
    
});


export default PostCard;
