import React from "react";
import { NavLink } from "react-router-dom";
import classes from '../../Styles/Home.module.css'
const Home = () => {
  const isLoggedIn=localStorage.getItem('idToken');

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8",
        {
          method:"POST",
          body:JSON.stringify({
            idToken:localStorage.getItem('idToken') ,
            requestType: "VERIFY_EMAIL"
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      if(response.ok){
        const data=await response.json();
        console.log("enjoy your verification",data)
      }
      else{
        console.log("somthing went wrong to verify email")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.verify}>
      <h2>Welcome to Expense tracker!!!</h2>
      {isLoggedIn && <h2>
        Your profile is incomplete.
        <NavLink to="/updateProfile">Complete now</NavLink>
      </h2>}
      {!isLoggedIn && <p>please login to procciding</p>}
      {isLoggedIn &&<div>
        <h2>Verify your Email here</h2>
        <button onClick={verifyEmailHandler}>Verify Email</button>
      </div>}
    </div>
  );
};

export default Home;
