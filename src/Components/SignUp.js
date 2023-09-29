import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const validateForm = () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setIsValid(isValid);
    } else {
      setIsValid(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validateForm();
    if (!isValid) {
      return setMessage("please filled all the field");
    }

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
          throw new Error("something went wrong !!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage("User successfully sign up");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          id="confirmpassword"
          placeholder="ConfirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button  >Sign up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
