import { configureStore } from '@reduxjs/toolkit';
import incomesReducer from './incomes/incomesSlice';
import expensesReducer from './expenses/expensesSlice';

// Create the Redux store by combining reducers
export const store = configureStore({
  reducer: {
    incomesReducer,   // Income-related state managed by incomesReducer
    expensesReducer   // Expenses-related state managed by expensesReducer
  }
});
