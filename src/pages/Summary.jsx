import "./Summary.css"
const Summary = () => {
  let totalExpensesPrice = JSON.parse(localStorage.getItem("expenses")).reduce((acc,income)=>{
    return acc += Number(income.price)
    },0)
    let totalIncomesPrice = JSON.parse(localStorage.getItem("incomes")).reduce((acc,income)=>{
      return acc += Number(income.price)
      },0)
  return (
    <section className="summary-sec">
      <h1>name</h1>
      <div>
        <h2>summary</h2>
        <p>total expenses: <span style={{color: "var(---primaryColour)"}}>${totalIncomesPrice}</span></p>
        <p>total income: <span style={{color: "var(---secondColor)"}}>${totalExpensesPrice}</span></p>
        <p>balance: <span style={{color: totalIncomesPrice < totalExpensesPrice ? "var(---secondColor)" : "var(---primaryColour)"}}>${totalIncomesPrice - totalExpensesPrice}</span></p>
      </div>
    </section>
  )
}

export default Summary