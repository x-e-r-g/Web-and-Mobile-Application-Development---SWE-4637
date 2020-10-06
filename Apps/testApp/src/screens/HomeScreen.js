import React from "react";
import { Text, StyleSheet, Button, View , Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = (props) => {
        return (
          <View>
            <Image
              source={require("./../../assets/logo.png")}
              style={styles.logo}
            ></Image>
            <View margin={30}>
              <Text style={styles.headerTextStyle}> Department of CSE </Text>
              <Text style={styles.header2TextStyle}> Programme: SWE </Text>
            </View>
            <TouchableOpacity
              onPress={function () {
                props.navigation.navigate("Profile");
              }}
            >
              <Text style={styles.headerTextStyle}>My Profile</Text>
            </TouchableOpacity>
            <View style={styles.buttonStyle}>
              <Button
                title="Semester wise Course List"
                onPress={function () {
                  props.navigation.navigate("Semesters");
                }}
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                title="List of Faculty Members"
                onPress={function () {
                  props.navigation.navigate("Faculties");
                }}
              />
            </View>
          </View>
        );
}
const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 20,
    color: "black",
    marginVertical: 5,
    alignSelf: "center",
  },
  header2TextStyle: {
    fontSize: 16,
    color: "black",
    marginVertical: 5,
    alignSelf: "center",
  },
  logo: {
    margin: 5,
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: 240,
    height: 320,
  },
  buttonStyle: {
    margin: 5,
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: 300,
    height: 50,
  },
});


export default HomeScreen;