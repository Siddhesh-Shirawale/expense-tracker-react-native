import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "./store/expenses-context";
import {
  getDateMinusDays,
  getFormattedDate2,
} from "../components/ExpensesOutput/util/date";
import { getRecentExpenses } from "../util/http";

const RecentExpenses = () => {
  const [errMsg, setErrMsg] = useState("");
  const expensesCtx = useContext(ExpensesContext);
  const [expenses, setExpenses] = useState(expensesCtx?.["expenses"]);

  const recentExpenses = expenses?.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      new Date(expense?.["createdAt"]) >= date7DaysAgo &&
      new Date(expense?.["createdAt"]) <= today
    );
  });

  const fetchExpenses = async () => {
    try {
      const response = await getRecentExpenses();

      if (response?.["success"]) {
        expensesCtx.setExpenses(response?.["data"]);
      } else {
        setErrMsg("Something went wrong!");

        setTimeout(
          setErrMsg(() => {
            setErrMsg("");
          }, 5000)
        );
      }
    } catch (error) {
      setErrMsg("Something went wrong!");

      setTimeout(
        setErrMsg(() => {
          setErrMsg("");
        }, 5000)
      );
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [expensesCtx?.["expenses"]]);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={"No expenses registered for the last 7 days."}
    />
  );
};

export default RecentExpenses;
