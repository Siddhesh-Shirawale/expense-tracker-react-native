import React, { useContext, useState, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallBackText={"No expenses registered."}
    />
  );
};

export default AllExpenses;
