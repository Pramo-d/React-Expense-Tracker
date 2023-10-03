import React from "react";
import classes from '../../Styles/ExpenseList.module.css'
const ExpenseList = (props) => {
     
    
  return (
    <div>
      <ul className={classes.list}>
        {props.expenseData.map((item,index)=>(
            <li key={index}>
                <span>{item.amount}</span>
                <span>{item.desc}</span>
                <span>{item.select}</span>
            </li>
        ))}
        </ul> 
    </div>
  );
};

export default ExpenseList;
