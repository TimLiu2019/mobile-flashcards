import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";
import { primary,white,light } from "../utils/colors";

const AddDeck = props => {
  const [title, setTitle] = useState("");
  const submit = () => {
    props.handleAddDeck(title);
    setTitle("");
    props.navigation.navigate("Dashboard");
  };
  return (
    <View style={styles.center}>
      <Text style={styles.deckTitle}>Add Deck</Text>
      <TextInput
        onChangeText={text => setTitle(text)}
        placeholder="title"
        value={title}
        style={ styles.inputContainer}
      ></TextInput>
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.text}>Add Deck</Text>
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
    marginTop:30
  },
  text: {
    color: white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  deckTitle:{
    color:primary,
    fontSize:28,
    marginBottom:60
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
    handleAddDeck: title => {
      dispatch(handleAddDeck(title));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddDeck);
