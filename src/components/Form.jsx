import { useState } from "react";
import "./Form.css";
const Form = ({ toggleShow, show, done }) => {
  const [price, setPrice] = useState(0);
  // const currency = ["EGY", "$", "EUR"];
  // const [myCurrency, setMyCurrency] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="form"
      style={{ display: show ? "flex" : "none" }}
    >
      <i className="fa-solid fa-x close" onClick={toggleShow}></i>

      <label htmlFor="amount">Price</label>
      <input
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        min="0"
        required
        id="amount"
        placeholder="put price"
        className="input"
      />

      {/* <select
        onChange={(e) => setMyCurrency(e.target.value)}
        id="currency-type"
        name="currency-type"
      >
        <option hidden value="wsfdsf">
          Choose the currency type
        </option>
        {currency.map((c, i) => {
          return (
            <option key={i} value={c}>
              {c}
            </option>
          );
        })}
      </select> */}

      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        placeholder="put category"
        onChange={(e) => setCategory(e.target.value)}
        className="input"
      />
      <div className="date">
        <label htmlFor="Date">Date: {date}</label>
        <input
          type="date"
          id="Date"
          placeholder="put your price"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <label htmlFor="Description">Description</label>
      <textarea
        name="Description"
        id="Description"
        cols="30"
        rows="10"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        
      ></textarea>
      <button onClick={(e) => done(e, price, category, date, description)}>
        done
      </button>
    </form>
  );
};

export default Form;
