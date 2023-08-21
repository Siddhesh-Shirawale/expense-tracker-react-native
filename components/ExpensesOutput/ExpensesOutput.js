import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../../contants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  console.log(expenses);

  if (expenses?.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
};

export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
