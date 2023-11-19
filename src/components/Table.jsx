import { useEffect } from "react";
import IncomeForm from "../components/Form";
import "./Incomes.css";

const Table = ({ pageName,data, totalPrice, show, toggleShow, done,deletee ,doNotAddExpensesFunc,totalExpensesPrice , totalIncomesPrice ,isExpensesBigger }) => {
  useEffect(()=>{
    if (totalExpensesPrice > totalIncomesPrice) {
      doNotAddExpensesFunc()
      
    } else {
      return
    }
  },[totalPrice])
  return (
    <section className="incomes-sec">
      <h1>{pageName}</h1>
      <div>
        <button onClick={toggleShow}>Add {pageName}</button>
      </div>
      <table className="incomes-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td>
                  <span>
                    {/* <i
                      onClick={toggleShow}
                      className="fa-solid fa-pen-to-square"
                    ></i> */}
                  </span>
                  <span>
                    <i onClick={()=> deletee(item)} className="fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <IncomeForm {...{toggleShow, show, done }}/>
      
      <h3>
        Total price = <span>${totalPrice}</span>
      </h3>
      {isExpensesBigger && <h4 style={{marginTop:"10px" , color: "red"}}>{"You cannot increase expenses, revenues must exceed expenses"}</h4>}
    </section>
  );
};

export default Table;
