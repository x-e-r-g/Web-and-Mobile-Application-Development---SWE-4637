import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SemesterListScreen = (props) => {
  const uni = [
    { name: "1st Semester", key: "1" },
    { name: "2nd Semester", key: "2" },
    { name: "3rd Semester", key: "3" },
  ];

  return (
    <View style={styles.viewStyle}>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={uni}
        renderItem={function ({ item }) {
          return (
            <TouchableOpacity
              onPress={function () {
                props.navigation.navigate("Courses", {
                    semester: item.name,
                });
              }}
            >
              <Text style={styles.headerTextStyle}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
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
  viewStyle: {
    margin: 20,
  },
});

export default SemesterListScreen;
