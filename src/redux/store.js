import { createStore , combineReducers } from "redux";
import incomesReducer from './incomes/incomesReducer'
import expensesReducer from "./expenses/expensesReducer"
const rootReducer = combineReducers({
  incomes : incomesReducer,
  expenses : expensesReducer
})

export const store = createStore(rootReducer)