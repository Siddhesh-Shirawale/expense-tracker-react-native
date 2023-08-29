import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {
  getDateMinusDays,
  getFormattedDate2,
} from "../components/ExpensesOutput/util/date";
import { getExpenses } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../store/expensesReducer";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);

  const expenses = useSelector((state) => state.expenses.expenses);
  const [expensesData, setExpensesData] = useState(expenses ?? []);
  const dispatch = useDispatch();

  const recentExpenses = expensesData?.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      new Date(expense?.["createdAt"]) >= date7DaysAgo &&
      new Date(expense?.["createdAt"]) <= today
    );
  });

  const fetchExpenses = async () => {
    try {
      setLoader(true);
      const response = await getExpenses();

      if (response?.["success"]) {
        dispatch(setExpenses(response?.["data"]));
        setLoader(false);
      } else {
        setErr(true);
        setLoader(false);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
    } catch (error) {
      setErr(true);
      setLoader(false);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    setExpensesData(expenses);
  }, [expenses]);

  const errorHandler = () => {
    setErr(false);
  };
  if (loader) {
    return <LoadingOverlay />;
  }
  if (err && !loader) {
    return <ErrorOverlay errorHandler={errorHandler} />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={"No expenses registered for the last 7 days."}
    />
  );
};

export default RecentExpenses;
