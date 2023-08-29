import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      // console.log(action.payload);

      state.expenses = [action.payload, ...state.expenses];
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
      const { id, ...updatedData } = action.payload;

      const itemIndex = state.expenses.findIndex((item) => item?.id === id);

      if (itemIndex !== -1) {
        state.expenses[itemIndex] = {
          ...state.expenses[itemIndex],
          ...updatedData,
        };
      }
    },
  },
});

export const { addExpense, setExpenses, removeExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
