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
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";

const Decks = props => {
  // const [decks, setDecks] = useState({});
  // const navigation = useNavigation();
  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const decksFromAsync = await AsyncStorage.getItem("DECKS");

    //     const defaultDecks = getDefault();

    //     if (decksFromAsync !== null) {
    //       setDecks(JSON.parse(decksFromAsync));
    //       // We have data!!
    //       console.log("from get decks: ", JSON.parse(decksFromAsync));
    //       return JSON.parse(decksFromAsync);
    //     } else {
    //       AsyncStorage.setItem("DECKS", JSON.stringify(defaultDecks));
    //       setDecks(JSON.stringify(defaultDecks));
    //       return defaultDecks;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    //fetchData();
   
  }, []);
  decks = props.decks;

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
                onPress={() =>
                  props.navigation.navigate("Deck", { deck: deck })
                }
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
function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(Decks);
