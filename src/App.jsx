import { Routes, Route, json } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Summary from "./pages/Summary";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/expenses";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";

function App() {
  const incomesData = useSelector((store) => store.incomes);
  const expensesData = useSelector((store) => store.expenses);

  useEffect(()=>{
    localStorage.setItem("incomes",JSON.stringify(incomesData))
    localStorage.setItem("expenses",JSON.stringify(expensesData))
  },[incomesData,expensesData])
  return (
    <>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/expenses" element={<Expenses />} />
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
