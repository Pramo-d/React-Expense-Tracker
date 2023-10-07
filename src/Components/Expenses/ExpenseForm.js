import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import classes from "./ExpenseForm.module.css";
import "./Theme.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../Auth/AuthExpense";
import { toggleDarkMode } from "../Auth/Theme";
import { CSVLink } from "react-csv";
import { useCallback } from "react";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [spentMoney, setSpentMoney] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [premium, setPremium] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);
  const [csvData, setCsv] = useState("No data");
  const [isEdit, setIsEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

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
          const expenseDataWithId = { ...data, id: result.name };
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
  const fetchApiData = useCallback(() => {
    fetch(
      `https://react-expense-tracker-5f2b4-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
        let arr = [];
        for (let key in data) {
          arr.push({
            id: key,
            desc: data[key].desc,
            amount: data[key].amount,
            select: data[key].select,
          });
        }
        setCsv(arr);
        setExpenses(arr);
        localStorage.setItem("allExpense", JSON.stringify(arr));
        dispatch(expenseAction.addExpenses(arr));
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

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
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].amount > 10000 && premiumActive === false) {
        setPremium(true);
        break;
      } else {
        setPremium(false);
      }
    }
  }, [expenses, premiumActive]);

  const activatePremiumHandler = () => {
    if (premium === true) {
      setPremiumActive(true);
      setPremium(false);
    } else {
      setPremiumActive(false);
    }
  };

  let header = [
    {
      label: "Amount",
      key: "amount",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Category",
      key: "category",
    },
  ];
  return (
    <div className={classes.container}>
      <div
        className={
          darkMode ? `${classes.expenseForm} darkTheme` : classes.expenseForm
        }
      >
        <div className={classes.formHeader}>
          <h2>Expense Tracker</h2>
          {premiumActive && (
            <button
              className={classes.themeBtn}
              onClick={() => dispatch(toggleDarkMode())}
            >
              Toggle Dark Mode
            </button>
          )}
        </div>
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

        <ExpenseList
          expenseData={expenses}
          editExpHandler={editExpHandler}
          deleteExpHandler={deleteExpHandler}
        />
        <div>
          {premium && (
            <button
              className={classes.premiumBtn}
              onClick={activatePremiumHandler}
            >
              Activate Premium
            </button>
          )}
          {premiumActive && (
            <button className={classes.csvBtn}>
              <CSVLink data={csvData} headers={header} filename="expenses.csv">
                Download Data
              </CSVLink>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
