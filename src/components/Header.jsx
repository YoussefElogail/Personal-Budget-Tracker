import { NavLink } from "react-router-dom"
import "./Header.css"
const Header = () => {
  return (
    <header>
      <div>
        <nav className="nav">
          <h4>Budget Tracker</h4>
          <ul className="sup-links">
            <li><NavLink to="/">
            Summary
              </NavLink></li>
            <li><NavLink to="/incomes">Incomes </NavLink></li>
            <li><NavLink to="/expenses">Expenses</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header