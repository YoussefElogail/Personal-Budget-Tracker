import * as actionTypes from './actionsTyps'

export const addIncomes = (payload) => {
  return{
    type : actionTypes.ADD_INCOMES,
    payload
  }
}

export const editIncomes = (payload) => {
  return{
    type : actionTypes.EDIT_INCOMES,
    payload
  }
}

export const deleteIncomes = (payload) => {
  return{
    type: actionTypes.Delete_INCOMES,
    payload
  }
}