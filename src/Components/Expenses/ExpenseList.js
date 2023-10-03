import React from "react";

const ExpenseList = (props) => {
     
    
  return (
    <div>
      <ul>
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
