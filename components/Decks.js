import React from "react";
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
import { useNavigation } from '@react-navigation/native';


const Decks = props => {
  decks = props.decks;
  const navigation = useNavigation(); 

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
                  navigation.navigate("Deck", { deck: deck })
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
