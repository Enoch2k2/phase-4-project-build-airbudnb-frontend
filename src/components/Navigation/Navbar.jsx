import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, logoutDog }) => {

  const loggedOutLinks = () => {
    return (
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    )
  }

  const handleLogout = e => {
    e.preventDefault();
    logoutDog();
  }

  const loggedInLinks = () => {
    return (
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/doghouses">DogHouses</Link></li>
        <li><a href="#" onClick={ handleLogout }>Logout</a></li>
      </ul>
    )
  }


  return (
    <div>
      { loggedIn ? loggedInLinks() : loggedOutLinks() }
    </div>
  )
}

export default Navbar
