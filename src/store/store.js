// Importing necessary functions and reducers from the Redux Toolkit library and local files
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";

import incomesReducer from "./incomes/incomesSlice";
import expensesReducer from "./expenses/expensesSlice";

// Create the Redux store by combining reducers
export const store = configureStore({
  reducer: {
    categoriesReducer,
    incomesReducer, // Income-related state managed by incomesReducer
    expensesReducer, // Expenses-related state managed by expensesReducer
  },
  devTools: false, // Disable Redux DevTools extension in the browser
});
