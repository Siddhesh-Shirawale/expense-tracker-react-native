import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import Button from "./Button";

const ErrorOverlay = ({ errorHandler }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Something went wrong. Try Later</Text>
      <Button onPress={errorHandler}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 23,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
