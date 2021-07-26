import React, { useState } from "react";
import { View, Text, Button, TextInput, SafeAreaView } from "react-native";
import { saveDeckTitle } from "../utils/api";

const AddDeck = () => {
  const [title, setTitle] = useState("");
  const submit = () => {
    console.log("submit title");

    saveDeckTitle(title);
    setTitle("");
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

export default AddDeck;
