import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabScreen from "./../navigation/HomeTab"
import PostScreen from "./../screens/PostScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeTabScreen}
      />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;