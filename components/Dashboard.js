import React, { useEffect } from "react";
import { View } from "react-native";
import Decks from "./Decks";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";

const Dashboard = (props) => {
  useEffect(() => {
    props.handleInitialData();
  }, []);
  return (
    <View>
      <Decks />
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
