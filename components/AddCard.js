import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { handleAddCard } from "../actions";

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
    <View>
      <Text>{title}</Text>
      <TextInput
        onChangeText={text => setQuestion(text)}
        placeholder="Question"
        value={question}
        style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
      ></TextInput>
      <TextInput
        onChangeText={text => setAnswer(text)}
        placeholder="Answer"
        value={answer}
        style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
      ></TextInput>
      <Button title="Add Card" onPress={submitCard}></Button>
    </View>
  );
};

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
