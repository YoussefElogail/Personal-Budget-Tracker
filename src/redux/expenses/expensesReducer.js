import * as actionsTypes from "./actionsTypes"

const initialState = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem("expenses")): []

const generateUniqueId = () => {
  // Generate a simple unique identifier (you may want to use a more robust method)
  return '_' + Math.random().toString(36).substr(2, 9);
};

const data = income => {
  // Add an 'id' property to the income object
  return { ...income, id: generateUniqueId() };
};

export default (state = initialState, { type, payload }) => {

  switch (type) {

  case actionsTypes.ADD_EXPENSES:
    return  [...state, data(payload) ]



    case actionsTypes.Delete_EXPENSES:
      return state.filter(item => item.id !== payload.id);

    case actionsTypes.Delete_LAST_EXPENSES:
      return [...state.slice(0, -1)]
    
  default:
    return state
  }
}
