import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackScreen from "./../navigation/HomeStack"
import ProfileScreen from "./../screens/ProfileScreen";

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeStackScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;