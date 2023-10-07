import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Components/Auth/Auth";
import expenseReducer from "../Components/Auth/AuthExpense";
import themeReducer from "../Components/Auth/Theme";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    expenseReducer: expenseReducer,
    theme: themeReducer,
  },
});
export default store;
