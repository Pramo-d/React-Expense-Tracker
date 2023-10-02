import React from 'react'
import './Header.css'
 import { NavLink,useNavigate } from 'react-router-dom'
const Header = () => {
const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('idToken');
    navigate('./login')
  }
  return (
    <div>
      <nav>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/updateProfile'>Profile</NavLink>
        <button onClick={handleLogout}> Logout</button>
      </nav>
    </div>
  )
}

export default Header
