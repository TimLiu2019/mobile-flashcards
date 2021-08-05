import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { handleRemoveDeck } from "../actions";
import { useNavigation } from '@react-navigation/native';

const Deck = props => {
  const route = useRoute();
  const deck = route.params.deck;
  const navigation = useNavigation(); 
  const onDeleteDeck = () => {
    props.onHandleRemoveDeck(deck.title);
    navigation.navigate("Dashboard");
  };
  return (
    <View>
      <Text>{route.params.deck.title}</Text>
      <Text>
        {route.params.deck.questions ? route.params.deck.questions.length : 0}{" "}
        cards
      </Text>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("AddCard", { title: deck.title });
        }}
      >
        <Text>Add Card</Text>
      </TouchableHighlight>

      <TouchableHighlight  onPress={() => {
          props.navigation.navigate("Quiz", { deck: deck });
        }}>
        <Text>Start Quiz</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => onDeleteDeck()}>
        <Text>Delete</Text>
      </TouchableHighlight>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleRemoveDeck: title => {
      dispatch(handleRemoveDeck(title));
    }
  };
};

export default connect(null,mapDispatchToProps)(Deck);
