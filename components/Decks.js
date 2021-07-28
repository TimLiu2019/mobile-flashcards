import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Decks = () => {
  const [decks, setDecks] = useState('');
  useEffect(async() => {
   
      try {
        const valueString = await AsyncStorage.getItem("DECKS");
        console.log('received deck string',valueString);
        const value = JSON.parse(valueString);
        // Other set states
        setDecks(valueString);
      //  console.log(value);
      } catch (error) {
        console.log(error);
      }
    
  },[]);
  return (
    <SafeAreaView>
      <View>
        <Text>{decks}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Decks;
