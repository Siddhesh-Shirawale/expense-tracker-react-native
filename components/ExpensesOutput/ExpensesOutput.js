import React from "react";
import { View } from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "A pair of shoes",
    amount: 6000,
    date: new Date("2023-7-31"),
  },
  {
    id: "e2",
    title: "A Jeans",
    amount: 3000,
    date: new Date("2023-8-6"),
  },
  {
    id: "e3",
    title: "A Tshirt",
    amount: 500,
    date: new Date("2023-8-7"),
  },
  {
    id: "e4",
    title: "A Shirt",
    amount: 2000,
    date: new Date("2023-8-10"),
  },
  {
    id: "e5",
    title: "A Shorts",
    amount: 1000,
    date: new Date("2023-8-12"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <View>
        <ExpenseSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
        <ExpenseList expenses={DUMMY_EXPENSES} />
      </View>
    </View>
  );
};

export default ExpensesOutput;
