import "./Summary.css"
const Summary = ({totalIncomesPrice, totalExpensesPrice}) => {
  

  return (
    <section className="summary-sec">
      <div>
        <h2>summary</h2>
        <p>total incomes: <span style={{color: "var(---primaryColour)"}}>${totalIncomesPrice}</span></p>
        <p>total expenses: <span style={{color: "var(---secondColor)"}}>${totalExpensesPrice}</span></p>
        <p>balance: <span style={{color: totalIncomesPrice < totalExpensesPrice ? "var(---secondColor)" : "var(---primaryColour)"}}>${totalIncomesPrice - totalExpensesPrice}</span></p>
      </div>
    </section>
  )
}

export default Summary