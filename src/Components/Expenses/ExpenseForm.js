import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseForm.module.css";
import { useDispatch } from "react-redux";
import { expenseAction } from "../Auth/AuthExpense";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [spentMoney, setSpentMoney] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const dispatch=useDispatch()

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isEdit === true) {
      const data = {
        amount: spentMoney,
        desc: description,
        select: selectCategory,
      };
      dispatch(expenseAction.addAmount(spentMoney));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addSelect(selectCategory));
      //api call for update/edit the value
      const response = await fetch(
        `https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsEdit(false);
        const result = await response.json();
        console.log(result);

        fetchApiData();
      } else {
        console.log("error occurs");
      }
    } else {
      const data = {
        amount: spentMoney,
        desc: description,
        select: selectCategory,
      };
      dispatch(expenseAction.addAmount(spentMoney));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addSelect(selectCategory));

      // api call for the post the data firebase realtime database
      try {
        const response = await fetch(
          `https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses.json`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          fetchApiData();
          const expenseDataWithId = { ...data, id:result.name };
          setExpenses([...expenses, expenseDataWithId]);
        } else {
          alert("something went wrong ");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    setSpentMoney("");
    setDescription("");
    setSelectCategory("");
  };
  // api data for get expense value
  const fetchApiData = async () => {
    const response = await fetch(
      `https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      let arr = [];
      for (let key in data) {
        arr.push({
          id:key,
          desc: data[key].desc,
          amount: data[key].amount,
          select: data[key].select,
        });
      }
      setExpenses(arr);
      localStorage.setItem("allExpense", JSON.stringify(arr));
      dispatch(expenseAction.addExpenses(expenses));
    } else {
      console.log("not getting proper response");
    }
  };

  const editExpHandler = (id) => {
    let editExpense = expenses.filter((expense) => {
      return expense.id === id;
    });
    setIsEdit(true);
    setExpenseId(id);
    setSpentMoney(editExpense[0].amount);
    setDescription(editExpense[0].desc);
    setSelectCategory(editExpense[0].select);
    console.log(editExpense);
  };

  const deleteExpHandler = async (id) => {
    const response = await fetch(
      `https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      // Consume the response body to ensure proper handling
      await response.json();
      
      // Remove the item with the specified id from the expenses array
      setExpenses((prevExpenses) =>
        prevExpenses.filter((item) => item.id !== id)
      );
    } else {
      console.log("Expense not deleted!!");
    }
    
  };
  
  useEffect(() => {
    fetchApiData();
  },[]);
  return (
    <div className={classes.expenseForm}>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={spentMoney}
          id="number"
          placeholder="Enter your amount"
          required
          onChange={(e) => {
            setSpentMoney(e.target.value);
          }}
        />
        <input
          type="text"
          id="description"
          value={description}
          placeholder="Enter description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <select
          value={selectCategory}
          id="select"
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
        <ExpenseList
          expenseData={expenses}
          editExpHandler={editExpHandler}
          deleteExpHandler={deleteExpHandler}
        />
      </div>
    </div>
  );
};

export default ExpenseForm;
