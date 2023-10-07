import React from "react";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  return (
    <div>
      <ul className={classes.list}>
        {props.expenseData.map((item, index) => (
          <li key={index} id={item.id} className={classes.listItem}>
            <div className={classes.row}>
              <div className={classes.column}>
                <span>Rs.{item.amount}</span>
              </div>
              <div className={classes.column}>
                <span>{item.desc}</span>
              </div>
              <div className={classes.column}>
                <span>{item.select}</span>
              </div>
            </div>
            <div className={classes.actions}>
              <button onClick={() => props.editExpHandler(item.id)}>
                Edit Expense
              </button>
              <button onClick={() => props.deleteExpHandler(item.id)}>
                Delete Expense
              </button>
              {/* {item.amount > 10000 && <button>Activate Premium</button>} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
