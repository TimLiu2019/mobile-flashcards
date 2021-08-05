import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStore } from "redux";
import middleware from "./middleware";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Deck from "./components/Deck";
import { setLocalNotification } from "./utils/helpers";

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DecksStackNavigator} />
      <Tab.Screen name="AddDeck" component={AddDeck} />
    </Tab.Navigator>
  );

  const Stack = createStackNavigator();
  const DecksStackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Deck" component={Deck} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );

  return (
    <Provider store={createStore(reducer, middleware)}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
