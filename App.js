import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddDeck from "./components/AddDeck";
import Decks from './components/Decks'
import Deck from './components/Deck'

export default function App() {
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
      <Stack.Screen name="Decks" component={Decks} />
      <Stack.Screen name="Deck" component={Deck} />
    </Stack.Navigator>
  );

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </View>
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
