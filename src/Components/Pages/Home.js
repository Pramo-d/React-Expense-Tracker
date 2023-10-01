import React from 'react'
import { NavLink } from 'react-router-dom'
const Home = () => {
  return (
    <div>
     <h2>Welcome to Expense tracker!!!</h2> 
     <h2> Your profile is incomplete.<NavLink to='/updateProfile'>Complete now</NavLink></h2>
    </div>
  )
}

export default Home
