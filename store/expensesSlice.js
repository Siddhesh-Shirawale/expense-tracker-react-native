import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducer: {
    addExpense: (state, payload) => {
      state.expenses([payload, ...state]);
    },
    deleteExpense: (state, payload) => {
      state.expenses([payload, ...state]);
    },
  },
});
