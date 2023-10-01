import React from 'react'
 import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <nav>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/login'> Logout</NavLink>
      </nav>
    </div>
  )
}

export default Header
