import { createSlice } from "@reduxjs/toolkit";
// Initial state of the expenses slice
const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [], // Retrieve stored expenses from local storage or default to an empty array
};

export const categoriesSlice = createSlice({
  name: "categories",  // Name of the slice
  initialState,      // Initial state
  reducers: {
    // Reducer to add a new expense
    addCategories: (state, { payload }) => {
      state.categories = [
        ...state.categories,
        { ...payload, id: Math.random() * 10000 },
      ];
    },
    // Reducer to edit an existing expense
    editCategories: (state, { payload }) => {
      const { id, updatedData } = payload;

      // Find the index of the expense to edit
      const index = state.categories.findIndex((item) => item.id === id);

      // Update the expense if found
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...updatedData };
      }
    },
    // Reducer to remove an expense
    removeCategories: (state, { payload }) => {
      state.categories = state.categories.filter((item) => item.id !== payload);
    },
  },
});

// Export the action creators
export const categoriesActions = categoriesSlice.actions;

// Export the reducer function
export default categoriesSlice.reducer;
