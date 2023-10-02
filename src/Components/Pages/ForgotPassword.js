import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import classes from '../../Styles/ForgotPassword.module.css'
 

const ForgotPassword = () => {
    const [resetMail,setResetMail]=useState("");

     const resetHandler=async()=>{
       
        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTmWANKoNV0gnTIOkp2gQVPFmrmwYejZ8",{
            method:"POST",
              body:JSON.stringify({
                requestType: "PASSWORD_RESET" ,
                email:resetMail
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            const data= await response.json();
            console.log(data)
            alert("reset password mail send to your register mail ");
        }else{
            console.log('something going wrong to reset password')
        }
       setResetMail("");
     };
  return (
    <>
    <div className={classes.forgot}>
      <h2> Enter the Email with which you have  register</h2>
      <input type='text' id='resetpassword' value={resetMail} onChange={(e)=>{setResetMail(e.target.value)}}/>
       <button onClick={resetHandler}>Send Link</button>
       <p>Already a user?</p><Link to='/login'>Login</Link>
    </div>
  
    </>
  )
}

export default ForgotPassword
