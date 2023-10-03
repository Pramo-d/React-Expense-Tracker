import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import classes from '../../Styles/ExpenseForm.module.css'

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [spentMoney, setSpentMoney] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      amount: spentMoney,
      desc: description,
      select: selectCategory,
    };
    setExpenses([...expenses, data]);

    try {
      const response = await fetch(
        "https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = response.json();
        console.log(result);
      } else {
        alert("something went wrong ");
      }
    } catch (error) {
      console.log(error);
    }

    setSpentMoney("");
    setDescription("");
    setSelectCategory("");
  };
  useEffect(() => {
    const fetchApiData = () => {
      fetch(
        "https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("response is not ok!!");
          }
        })
        .then((data) => {
          console.log(data);
          let arr = [];
          for (let key in data) {
            arr.push({
              desc: data[key].desc,
              amount: data[key].amount,
              select: data[key].select,
            });
          }
          setExpenses(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchApiData();
  }, []);

  return (
    <div className={classes.expenseForm}>
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
