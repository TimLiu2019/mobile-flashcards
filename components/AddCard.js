import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const AddCard = ({}) => {
  const route = useRoute();
  const title = route.params.title;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default AddCard;