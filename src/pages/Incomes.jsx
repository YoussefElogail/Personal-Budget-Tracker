import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as actions from "../redux/incomes/actions";

import Table from "../components/Table";

const Incomes = () => {
  const [show, setShow] = useState(false);
  const data = useSelector((store) => store.incomes);
  const dispatch = useDispatch();
  let totalPrice = data.reduce((acc, income) => {
    return (acc += Number(income.price));
  }, 0);
  const toggleShow = () => {
    setShow(!show);
  };
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
      actions.addIncomes({
        price: parseFloat(price),
        category,
        date,
        description,
      })
    );
    toggleShow();
  };

  const deletee = (itme) => {
    dispatch(actions.deleteIncomes(itme))
  }
  return <Table pageName={"Incomes"}{...{ data, totalPrice, show, toggleShow, done, deletee }} />;
};

export default Incomes;
