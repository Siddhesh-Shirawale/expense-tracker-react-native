import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../contants/styles";

const ExpenseSummary = ({ periodName, expenses }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodStyle}>{periodName}</Text>
      <Text style={styles.sumStyle}>{expensesSum.toFixed(2)} ₹</Text>
    </View>
  );
};

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodStyle: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },

  sumStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
