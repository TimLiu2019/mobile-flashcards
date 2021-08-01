import React, { useState } from "react";
import { View, Text,TextInput,Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { addCardToDeck } from "../utils/api";

const AddCard = ({}) => {
  const route = useRoute();
  const title = route.params.title;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submitCard = () => {
    console.log("submit card");

    addCardToDeck(title, { question: question, answer: answer });
    setQuestion("");
    setAnswer("");
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

export default AddCard;
