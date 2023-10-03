import React, { useState } from "react";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [spentMoney, setSpentMoney] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      amount: spentMoney,
      desc: description,
      select: selectCategory,
    };
    setExpenses([...expenses,data]);
    setSpentMoney("");
    setDescription("");
    setSelectCategory("");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={spentMoney}
          placeholder="Enter your amount"
          required
          onChange={(e) => {
            setSpentMoney(e.target.value);
          }}
        />
        <input
          type="text"
          value={description}
          placeholder="Enter description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <select
          value={selectCategory}
          required
          onChange={(e) => {
            setSelectCategory(e.target.value);
          }}
        >
          <option value="" disabled>
            selectCategory
          </option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expenses</button>
      </form>
      <div>
        <ExpenseList expenseData={expenses} />
      </div>
    </div>
  );
};

export default ExpenseForm;
