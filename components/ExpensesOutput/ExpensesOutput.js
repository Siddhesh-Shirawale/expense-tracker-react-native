import React from "react";
import { StyleSheet, View } from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../../contants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 6000,
    date: new Date("2023-7-31"),
  },
  {
    id: "e2",
    description: "A Jeans",
    amount: 3000,
    date: new Date("2023-8-6"),
  },
  {
    id: "e3",
    description: "A Tshirt",
    amount: 500,
    date: new Date("2023-8-7"),
  },
  {
    id: "e4",
    description: "A Shirt",
    amount: 2000,
    date: new Date("2023-8-10"),
  },
  {
    id: "e5",
    description: "A Shorts",
    amount: 1000,
    date: new Date("2023-8-12"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpenseSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpenseList expenses={DUMMY_EXPENSES} />
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
});
