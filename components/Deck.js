import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { handleRemoveDeck } from "../actions";
import { useNavigation } from "@react-navigation/native";
import { primary, white, secondary } from "../utils/colors";

const Deck = props => {
  const route = useRoute();
  const deck = route.params.deck;
  const navigation = useNavigation();
  const onDeleteDeck = () => {
    props.onHandleRemoveDeck(deck.title);
    navigation.navigate("Dashboard");
  };
  return (
    <View style={styles.center}>
      <Text style={styles.deckTitle}>{route.params.deck.title}</Text>
      <Text style={styles.cardTitle}>
        {route.params.deck.questions ? route.params.deck.questions.length : 0}{" "}
        cards
      </Text>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("AddCard", { title: deck.title });
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Add Card</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("Quiz", { deck: deck });
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Start Quiz</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => onDeleteDeck()} style={styles.button}>
        <Text style={styles.text}>Delete</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  button: {
    backgroundColor: primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    marginTop: 20
  },
  text: {
    color: white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  deckTitle: {
    color: primary,
    fontSize: 28
  },
  cardTitle: {
    color: secondary,
    fontSize: 28
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onHandleRemoveDeck: title => {
      dispatch(handleRemoveDeck(title));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Deck);
