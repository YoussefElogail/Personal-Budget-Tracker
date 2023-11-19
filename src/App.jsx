import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Summary from "./pages/Summary";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";

function App() {
  const incomesData = useSelector((store) => store.incomes);
  const expensesData = useSelector((store) => store.expenses);

  let totalIncomesPrice = JSON.parse(localStorage.getItem("incomes"))?incomesData.reduce((acc,income)=>{
    return acc += Number(income.price)
  },0):0
  
  let totalExpensesPrice = JSON.parse(localStorage.getItem("expenses"))?expensesData.reduce((acc,income)=>{
    return acc += Number(income.price)
    },0) : 0
  useEffect(()=>{
    localStorage.setItem("incomes",JSON.stringify(incomesData))
    localStorage.setItem("expenses",JSON.stringify(expensesData))
  },[incomesData,expensesData])
  
  return (
    <>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Summary  {...{totalIncomesPrice, totalExpensesPrice}}/>} />
            <Route path="/incomes" element={<Incomes {...{totalIncomesPrice, totalExpensesPrice}}/>} />
            <Route path="/expenses" element={<Expenses {...{totalIncomesPrice, totalExpensesPrice}}/>} />
            <Route
              path="*"
              element={
                <>
                  <h1>Page not found 404</h1>
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
    </>
  );
}

export default App;
