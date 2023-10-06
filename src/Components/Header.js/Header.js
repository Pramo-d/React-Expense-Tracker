import React from "react";
import "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../Auth/Auth";

const Header = () => {
  const dispatch=useDispatch()
  const auth=useSelector((state)=>state.authReducer.isAuthenticated)
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("idToken");
    navigate("/login");
  };
  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/updateProfile">Profile</NavLink>
     { auth && <NavLink to="/expenseForm">ExpenseForm</NavLink>}
       {!auth && <NavLink to="/login">Login</NavLink>}
      { auth && <button onClick={handleLogout}> Logout</button>}
      </nav>
    </div>
  );
};

export default Header;
