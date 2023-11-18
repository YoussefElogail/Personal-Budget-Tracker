import { createStore , combineReducers } from "redux";
import incomesReducer from './incomes/reducer'
import expensesReducer from "./expenses/reducer"
const rootReducer = combineReducers({
  incomes : incomesReducer,
  expenses : expensesReducer
})

export const store = createStore(rootReducer)