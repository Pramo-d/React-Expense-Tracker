// import "./App.css";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import UpdateProfile from "./Components/Pages/UpdateProfile";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js/Header";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import ExpenseForm from "./Components/Expenses/ExpenseForm";

function App() {
   
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenseForm" element={<ExpenseForm />} />
      </Routes>
    </div>
  );
}

export default App;
