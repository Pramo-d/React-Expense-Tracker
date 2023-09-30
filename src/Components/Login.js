import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

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
          headers:{
            'Content-Type':'application/json'
          }
        }
      );
      if(response.ok){
        navigate('/*')
      }else{
        throw new Error('invalid filled entered')
      }
        
      
      const data = response.json();
      console.log(data);
     
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <section>
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
          <button  >Login</button>
        </form>
        <button>Forgot password</button>
        <div>
          <p>
            <span> Don`t have an account?</span>
            <span>
              <Link to="/">SignUp</Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
