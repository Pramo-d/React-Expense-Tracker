import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  amount: "",
  desc: "",
  select: "",
};

const ExpenseSlice = createSlice({
  name: "authExpense",
  initialState: initialState,
  reducers: {
    addExpenses(state, action) {
      state.expenses.push(action.payload);
    },
    addAmount(state, action) {
      state.amount = action.payload;
    },
    addDesc(state, action) {
      state.desc = action.payload;
    },
    addSelect(state, action) {
      state.select = action.payload;
    },
  },
});
export const expenseAction = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
