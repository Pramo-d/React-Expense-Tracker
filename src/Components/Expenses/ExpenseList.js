import React from "react";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  return (
    <div>
      <ul className={classes.list}>
        {props.expenseData.map((item, index) => (
          <li key={index} id={item.id}>
            <span>Rs.{item.amount} </span>
            <span> || {item.desc} </span>
            <span> || {item.select}</span>
            <button onClick={() => props.editExpHandler(item.id)}>
              Edit Expense
            </button>
            <button onClick={() => props.deleteExpHandler(item.id)}>
              Delete Expense
            </button>
            {item.amount >10000 && <button>Activate Premium</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
