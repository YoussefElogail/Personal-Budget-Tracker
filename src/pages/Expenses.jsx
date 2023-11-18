import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import * as actions from "../redux/expenses/actions"

const Expenses = () => {
  const [show, setShow] = useState(false)
  const data = useSelector((store) => store.expenses);
  const dispatch = useDispatch()
  let totalPrice = data.reduce((acc,income)=>{
  return acc += Number(income.price)
  },0)
  const toggleShow = () => {
    setShow(!show)
  }
  const done = (e, price, category, date, description) => {
    e.preventDefault();
    if (
      !price ||
      isNaN(parseFloat(price)) ||
      price <= 0 ||
      !category ||
      !date ||
      !description
    ) {
      alert("Invalid input. Please fill in all fields with valid values.");
      return;
    }
    dispatch(
      actions.addExpenses({
        price: parseFloat(price),
        category,
        date,
        description,
      })
    );
    toggleShow();
  };

  const deletee = (itme) => {
    dispatch(actions.deleteExpenses(itme))
  }
  return (
    <Table pageName={"Expenses"} {...{data,totalPrice,show,toggleShow,done,deletee}}/>
  );
}

export default Expenses