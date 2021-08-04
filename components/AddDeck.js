import React, { useState } from "react";
import { View, Text, Button, TextInput, SafeAreaView } from "react-native";
import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";

const AddDeck = props => {
  const [title, setTitle] = useState("");
  const submit = () => {
    console.log("submit title");
    props.handleAddDeck(title);
    setTitle("");
    props.navigation.navigate("Dashboard");
  };
  return (
    <SafeAreaView>
      <View style={{ marginTop: 5 }}>
        <Text>Add Deck</Text>
        <TextInput
          onChangeText={text => setTitle(text)}
          placeholder="title"
          value={title}
          style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
        ></TextInput>
        <Button title="Add Deck" onPress={submit}></Button>
      </View>
    </SafeAreaView>
  );
};

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
