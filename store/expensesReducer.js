import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    setExpenses: (state, action) => {
      console.log(action.payload);
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
