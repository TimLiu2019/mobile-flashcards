import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDefault } from "../utils/api";
import { Deck } from "./Deck";
import { useNavigation } from "@react-navigation/native";

const Decks = ({navigation}) => {
  const [decks, setDecks] = useState({});
 // const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        const decks = await AsyncStorage.getItem("DECKS");

        const defaultDecks = getDefault();

        if (decks !== null) {
          setDecks(JSON.parse(decks));
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
      <ScrollView>
        {Object.keys(decks).length === 0 ? (
          <Text>No deck to display</Text>
        ) : (
          Object.values(decks).map(deck => {
            return !deck.title ? null : (
              <TouchableOpacity
                key={deck.title}
                onPress={() => navigation.navigate("Deck", {deck:deck})}
              >
                <View>
                  <Text>{deck.title}</Text>
                  <Text>
                    {deck.questions
                      ? ` ${deck.questions.length} cards`
                      : ` 0 cards`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Decks;
