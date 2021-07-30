import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDecks, getDefault } from "../utils/api";

const Decks = () => {
  const [decks, setDecks] = useState("");
  useEffect(() => {
    // const value = getDecks();
  
    // const valueString = JSON.stringify(value);
    // console.log('v string',valueString);
    // // Other set states
    // setDecks(valueString);
    async function fetchData() {
      try {
        const decks = await AsyncStorage.getItem("DECKS");
    
        const defaultDecks = getDefault()

        if (decks !== null) {
            setDecks(decks);
            // We have data!!
            console.log("from get decks: ", JSON.parse(decks));
            return JSON.parse(decks);
          } else {
            AsyncStorage.setItem("DECKS", JSON.stringify(defaultDecks));
            setDecks(JSON.stringify(defaultDecks));
            return defaultDecks;
          }
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>{decks}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Decks;
