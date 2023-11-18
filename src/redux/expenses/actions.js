import * as actionsTypes from "./actionsTypes"
export const addExpenses = (payload) => {
  return{
    type: actionsTypes.ADD_EXPENSES,
    payload
  }
}


export const deleteExpenses = (payload) => {
  return{
    type: actionsTypes.Delete_EXPENSES,
    payload
  }
}