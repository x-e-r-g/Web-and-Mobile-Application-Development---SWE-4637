import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

const FacultyListScreen = () =>{
    const uni = [
      { name: "Tajkia Toma", key: "1" },
      { name: "Mohayeminul Islam", key: "2" },
      { name: "Tasnim Ahmend", key: "3" },
      { name: "Abdul Hakim", key: "4" },
      { name: "Fazlul Siddiqui", key: "5" },
      { name: "Ridwn Kabir", key: "6" },
    ];

    return (
      <View style={styles.viewStyle}>
        <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
            data = {uni}
            renderItem = {function({item}){
                return(<Text style={styles.textStyle}>{item.name}</Text>);
            }}
        />
      </View>
    );
}

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 20,
            color: 'black',
            marginVertical: 10
        },
        viewStyle:{
            margin: 20,
        }
    }
);

export default FacultyListScreen;