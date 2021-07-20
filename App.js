import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";

export default function App() {
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="AddDeck" component={AddDeck} />
    </Tab.Navigator>
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
