import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const FacultyListScreen = (props) => {
  const sem1 = [
    { name: "Hum 4145", key: "1" },
    { name: "Hum 4147", key: "2" },
    { name: "Math 4141", key: "3" },
    { name: "Physics 4143", key: "4" },
    { name: "SWE 4101", key: "5" },
    { name: "Autocad Lab", key: "6" },
  ];

  const sem2 = [
    { name: "CSE 4203", key: "1" },
    { name: "CSE 4205", key: "2" },
    { name: "HUM 4247", key: "3" },
    { name: "Math 4241", key: "4" },
    { name: "SWE 4201", key: "5" },
    { name: "CSE 4206", key: "6" },
  ];

  const sem3 = [
    { name: "CSE 4304", key: "1" },
    { name: "CSE 4308", key: "2" },
    { name: "SWE 4302", key: "3" },
    { name: "SWE 4304", key: "4" },
    { name: "Math 4341", key: "5" },
    { name: "CSE 4309", key: "6" },
  ];
  
  const semester = props.route.params.semester;
  let courseList = sem1;

  if (semester == "1st Semester") {
    courseList = sem1;
  } else if (semester == "2nd Semester") {
    courseList = sem2;
  } else if (semester == "3rd Semester") {
    courseList = sem3;
  }

  return (
    <View style={styles.viewStyle}>
        <Text style={styles.headerTextStyle}>{semester}</Text>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={courseList}
        renderItem={function ({ item }) {
          return <Text style={styles.header2TextStyle}>{item.name}</Text>;
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
    alignSelf: "center",
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

export default FacultyListScreen;
