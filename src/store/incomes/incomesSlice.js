import { createSlice } from "@reduxjs/toolkit";

// Initial state of the income slice
const initialState = {
  incomes: JSON.parse(localStorage.getItem("incomes")) || [],
};

// Create the income slice using createSlice
export const incomeSlice = createSlice({
  name: "income",  // Name of the slice
  initialState,    // Initial state
  reducers: {
    // Reducer to add a new income
    addIncome: (state, { payload }) => {
      state.incomes = [
        ...state.incomes,
        { ...payload, id: Math.random() * 10000 },
      ];
    },
    // Reducer to edit an existing income
    editIncome: (state, { payload }) => {
      const { id, updatedData } = payload;

      // Find the index of the income to edit
      const index = state.incomes.findIndex((item) => item.id === id);

      // Update the income if found
      if (index !== -1) {
        state.incomes[index] = { ...state.incomes[index], ...updatedData };
      }
    },
    // Reducer to remove an income
    removeIncome: (state, { payload }) => {
      state.incomes = state.incomes.filter((item) => item.id !== payload);
    },
  },
});

// Export the action creators
export const incomeActions = incomeSlice.actions;

// Export the reducer function
export default incomeSlice.reducer;
