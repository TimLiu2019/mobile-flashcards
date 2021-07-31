import React from "react";
import { View, Text } from "react-native";
import { useRoute } from '@react-navigation/native';

const Deck = () => {
  const route = useRoute();
  return (
    <View>
      <Text>{route.params.deck.title}</Text>
      <Text>{route.params.deck.questions ? route.params.deck.questions.length : 0 } cards</Text>
    </View>
  );
};

export default Deck;
