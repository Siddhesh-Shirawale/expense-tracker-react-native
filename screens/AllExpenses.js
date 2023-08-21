import React, { useContext, useState, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "./store/expenses-context";
import { getExpenses } from "../util/http";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();

      if (response?.["success"]) {
        setExpenses(response?.["data"]);
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
      expenses={expenses}
      expensesPeriod="Total"
      fallBackText={"No expenses registered."}
    />
  );
};

export default AllExpenses;
