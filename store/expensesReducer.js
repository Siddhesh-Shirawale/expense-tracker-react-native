import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const newState = [action.payload, ...state.expenses];

      state.expenses = newState;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    removeExpense: (state, action) => {
      state.expenses.splice(
        state.expenses.findIndex((expense) => expense.id === action.payload),
        1
      );
    },
    updateExpense: (state, action) => {
      state.expenses.splice(
        state.expenses.findIndex((expense) => expense.id === action.payload),
        1
      );
    },
  },
});

export const { addExpense, setExpenses, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
