import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdJA1m9wMwIt2uu4S3apEvigFJe0QUjS4",
  authDomain: "flogger-c4f88.firebaseapp.com",
  databaseURL: "https://flogger-c4f88.firebaseio.com",
  projectId: "flogger-c4f88",
  storageBucket: "flogger-c4f88.appspot.com",
  messagingSenderId: "271306697021",
  appId: "1:271306697021:web:25584ea4d5c29f77b8fd54"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
