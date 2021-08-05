import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

const Quiz = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const deck = route.params.deck;
  const questions = deck.questions;

  const onShowAnswer = () => {
    setShowAnswer(current => !current);
  };
  const onCheckAnswer = answer => {
    if (questions[questionIndex].answer === answer) {
      setCorrectAnswer(current => current + 1);
    }
    if (questionIndex === questions.length - 1) {
      setShowScore(true);
    } else if (questionIndex < questions.length - 1) {
      setQuestionIndex(current => current + 1);
    }

    clearLocalNotification().then(setLocalNotification);
  };

  const onRestartQuiz = () => {
    setShowScore(false);
    setShowAnswer(false);
    setCorrectAnswer(0);
    setQuestionIndex(0);
  };
  const onBackToDeck = () => {
    console.log("back to deck");
    navigation.navigate("Deck", { deck: deck });
  };

  if (questions.length === 0) {
    return (
      <View>
        <Text>
          Sorry, you cannot take a quiz, because there are no cards in the deck
        </Text>
      </View>
    );
  }
  if (!showScore) {
    return (
      <View>
        <Text>
          {questionIndex + 1}/{questions.length}
        </Text>
        {showAnswer ? (
          <Text>{questions[questionIndex].answer}</Text>
        ) : (
          <Text>{questions[questionIndex].question}</Text>
        )}
        <Button
          title={showAnswer ? "question" : "answer"}
          onPress={() => onShowAnswer()}
        ></Button>
        <Button
          title="Correct"
          onPress={() => onCheckAnswer("Correct")}
        ></Button>
        <Button
          title="Incorrect"
          onPress={() => onCheckAnswer("Inorrect")}
        ></Button>
      </View>
    );
  }
  if (showScore) {
    return (
      <View>
        <Text>Your Score:</Text>
        <Text>
          {correctAnswer} of {questions.length}
        </Text>
        <Button title="Restart Quiz" onPress={() => onRestartQuiz()}></Button>
        <Button title="Back to Deck" onPress={() => onBackToDeck()}></Button>
      </View>
    );
  }
};

export default Quiz;
