import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {
  getDateMinusDays,
  getFormattedDate2,
} from "../components/ExpensesOutput/util/date";
import { getExpenses } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../store/expensesReducer";

const RecentExpenses = () => {
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses.expenses);

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
      const response = await getExpenses();

      if (response?.["success"]) {
        dispatch(setExpenses(response?.["data"]));
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
