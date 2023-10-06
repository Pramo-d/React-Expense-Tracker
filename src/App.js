// import "./App.css";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import UpdateProfile from "./Components/Pages/UpdateProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header.js/Header";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import ExpenseForm from "./Components/Expenses/ExpenseForm";
import { useSelector } from "react-redux";
function App() {
  const auth = useSelector((state) => state.authReducer.isAuthenticated);
  return (
    <div className="App">
      <Header />
      <Routes>
        {!auth && <Route path="/" element={<SignUp />} />}
        {!auth && <Route path="/login" element={<Login />} />}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {auth && <Route path="/updateProfile" element={<UpdateProfile />} />}
        <Route path="/home" element={<Home />} />

        {auth && <Route path="/expenseForm" element={<ExpenseForm />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
