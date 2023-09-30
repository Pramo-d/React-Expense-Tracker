import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8",
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
    )
      .then((response) => {
        if (!response.ok) {
          setMessage("something went wrong !!");
        }
        return response.json();
      })
      .then((data) => {
        setMessage("User successfully sign up", data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>SignUp</h2>
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

        <input
          type="password"
          id="confirmpassword"
          placeholder="ConfirmPassword"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>
          <span>{message}</span>
        </p>
        <button>Sign up</button>
      </form>
      <div>
        <span>Have an account?</span>
        <span>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
