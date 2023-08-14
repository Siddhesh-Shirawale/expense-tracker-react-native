import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "./store/expenses-context";
import { getDateMinusDays } from "../components/ExpensesOutput/util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  // const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expenses?.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense?.date >= date7DaysAgo && expense?.date <= today;
  });

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();

      if (response?.["success"]) {
        console.log(response?.["data"]);
        // setExpenses(response?.["data"]);
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
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={"No expenses registered for the last 7 days."}
    />
  );
};

export default RecentExpenses;
