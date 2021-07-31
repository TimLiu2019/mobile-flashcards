import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useRoute } from "@react-navigation/native";

const Deck = ({navigation}) => {
  const route = useRoute();
  const deck = route.params.deck;
  return (
    <View>
      <Text>{route.params.deck.title}</Text>
      <Text>
        {route.params.deck.questions ? route.params.deck.questions.length : 0}{" "}
        cards
      </Text>
      <TouchableHighlight
        onPress={() => navigation.navigate("AddCard", { title: deck.title })}
      >
        <Text >Add Card</Text>
      </TouchableHighlight>

      <TouchableHighlight
       
      >
        <Text >Start Quiz</Text>
      </TouchableHighlight>

      <TouchableHighlight

  
      >
        <Text >Delete</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Deck;
