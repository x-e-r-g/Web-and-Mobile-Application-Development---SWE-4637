import React from "react";
import { Text, StyleSheet, Button, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
  return (
    <View>
      <Image
        source={require("./../../assets/pp.png")}
        style={styles.DisplayImage}
      ></Image>
      <View margin={30}>
        <Text style={styles.headerTextStyle}> Name: Zubair Rahman Tusar </Text>
        <Text style={styles.header2TextStyle}> Student ID: 170042067 </Text>
        <Text style={styles.header2TextStyle}> Room no. N/A </Text>
        <Text style={styles.header2TextStyle}> Email: zubairrahman@iut-dhaka.edu </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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

export default Profile;
