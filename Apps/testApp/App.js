import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CreateStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FacultyListScreen from "./src/screens/FacultyListScreen";
import SemesterListScreen from "./src/screens/SemesterListScreen";
import CourseListScreen from "./src/screens/CourseListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home">
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Faculties" component={FacultyListScreen} />
        <stack.Screen name="Profile" component={ProfileScreen} />
        <stack.Screen name="Semesters" component={SemesterListScreen} />
        <stack.Screen name="Courses" component={CourseListScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;