import { createSlice } from "@reduxjs/toolkit";

// Initial state of the expenses slice
const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
};

// Create the expenses slice using createSlice
export const expensesSlice = createSlice({
  name: "expenses",  // Name of the slice
  initialState,      // Initial state
  reducers: {
    // Reducer to add a new expense
    addExpenses: (state, { payload }) => {
      state.expenses = [
        ...state.expenses,
        { ...payload, id: Math.random() * 10000 },
      ];
    },
    // Reducer to edit an existing expense
    editExpenses: (state, { payload }) => {
      const { id, updatedData } = payload;

      // Find the index of the expense to edit
      const index = state.expenses.findIndex((item) => item.id === id);

      // Update the expense if found
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...updatedData };
      }
    },
    // Reducer to remove an expense
    removeExpenses: (state, { payload }) => {
      state.expenses = state.expenses.filter((item) => item.id !== payload);
    },
  },
});

// Export the action creators
export const expensesActions = expensesSlice.actions;

// Export the reducer function
export default expensesSlice.reducer;
