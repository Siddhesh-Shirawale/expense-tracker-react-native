import { configureStore } from "@reduxjs/toolkit";
import ExpenseReducer from "./features/expenseSlice";

export default configureStore({
  reducer: {
    expenses: ExpenseReducer,
  },
});
