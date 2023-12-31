import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../Styles/Login.module.css";
import { useDispatch } from "react-redux";
import { authAction } from "../Auth/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/home");
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("idToken", data.idToken);
        // localStorage.setItem('email',data.email)
      
        dispatch(authAction.login(data.idToken));
        console.log("login successfully");
      } else {
        throw new Error("invalid filled entered");
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className={classes.Login}>
      <form onSubmit={loginHandler}>
        <h2>Login</h2>
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/forgotpassword">ForgotPassword</Link>
      </form>

      <div>
        <p>
          <span> Don`t have an account?</span>
          <span>
            <Link to="/">SignUp</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
