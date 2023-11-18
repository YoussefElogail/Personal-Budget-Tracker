import * as actionTypes from './actionsTyps'
const initialState = localStorage.getItem("incomes")?JSON.parse(localStorage.getItem("incomes")):[]

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

  case actionTypes.ADD_INCOMES:
    return  [...state, data(payload)]

    case actionTypes.EDIT_INCOMES:
      return 

    case actionTypes.Delete_INCOMES:
      console.log(payload);
      return state.filter(item => item.id !== payload.id);


  default:
    return state
  }
}
