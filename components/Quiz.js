import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { primary, white, secondary } from "../utils/colors";
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
    navigation.navigate("Deck", { deck: deck });
  };

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>
          Sorry, you cannot take a quiz, because there are no cards in the deck
        </Text>
      </View>
    );
  }
  if (!showScore) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.progress}>
            {questionIndex + 1}/{questions.length}
          </Text>
        </View>
        <View style={styles.center}>
          {showAnswer ? (
            <Text>{questions[questionIndex].answer}</Text>
          ) : (
            <Text>{questions[questionIndex].question}</Text>
          )}
          <Button
            title={showAnswer ? "question" : "answer"}
            onPress={() => onShowAnswer()}
          ></Button>
          <TouchableHighlight
            onPress={() => onCheckAnswer("Correct")}
            style={styles.buttonCorrect}
          >
            <Text style={styles.text}>Correct</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => onCheckAnswer("Inorrect")}
            style={styles.button}
          >
            <Text style={styles.text}>Incorrect</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  if (showScore) {
    return (
      <View style={styles.center}>
        <Text style={styles.scoreTitle}>Your Score:</Text>
        <Text style={styles.cardTitle}>
          {correctAnswer} of {questions.length}
        </Text>
        <TouchableHighlight
           onPress={() => onRestartQuiz()}
            style={styles.button}
          >
            <Text style={styles.text}>Restart Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight
           onPress={() => onBackToDeck()}
            style={styles.button}
          >
            <Text style={styles.text}>Back to Deck</Text>
          </TouchableHighlight>
       
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  center: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },

  progress: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row"
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
  buttonCorrect: {
    backgroundColor: secondary,
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
  scoreTitle: {
    color: primary,
    fontSize: 20,
    marginBottom:20
  },
  cardTitle: {
    color: secondary,
    fontSize: 28,
    marginBottom:20
  }
});

export default Quiz;
