import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { handleAddCard } from "../actions";
import { white, primary, light,secondary } from "../utils/colors";

const AddCard = props => {
  const route = useRoute();
  const title = route.params.title;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submitCard = () => {
    props.handleAddCardToDeck(title, question, answer);
    setQuestion("");
    setAnswer("");
    props.navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.center}>
      <Text style={styles.deckTitle}>Add a new card</Text>
      <TextInput
        onChangeText={text => setQuestion(text)}
        placeholder="Question"
        value={question}
        style={ styles.inputContainer}
      ></TextInput>
      <TextInput
        onChangeText={text => setAnswer(text)}
        placeholder="Answer"
        value={answer}
        style={ styles.inputContainer}
      ></TextInput>
     <TouchableOpacity onPress={submitCard} style={styles.button}>
        <Text style={styles.text}>Add Card</Text>
      </TouchableOpacity>
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

  inputContainer:{
    backgroundColor:white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  }
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddCardToDeck: (title, question, answer) => {
      dispatch(handleAddCard(title, question, answer));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddCard);
