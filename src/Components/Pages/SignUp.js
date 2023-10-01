import React, { useState } from "react";
import '../../Styles/Login.css'
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
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
    );
    if (response.ok) {
      setMessage("User successfully sign up");
    } else {
      setMessage("something went wrong !!");
    }
    const data = response.json();
    console.log(data);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="Signup">
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
