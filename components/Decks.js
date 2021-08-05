import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { white, primary, light } from "../utils/colors";

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
                onPress={() => navigation.navigate("Deck", { deck: deck })}
                style={styles.card}
              >
                <View style={styles.row}>
                  <Text style={styles.text}>{deck.title}</Text>
                  <Text style={styles.textCard}>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    color: white,
    marginBottom: 5,
    color: white,
    fontWeight: "bold"
  },
  card: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 7,
    height: 70,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  text: {
    color: white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  textCard: {
    color: light,
    fontSize: 18,
    textTransform: "lowercase",
    marginTop: 10,
    fontWeight: "normal"
  }
});
function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(Decks);
