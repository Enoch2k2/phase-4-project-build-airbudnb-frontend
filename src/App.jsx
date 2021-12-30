import React, { useEffect, useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/static/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import { baseUrl, headers, getToken } from './Globals';

const App = () => {
  const [currentDog, setCurrentDog] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const loginDog = dog => {
    setCurrentDog(dog);
    setLoggedIn(true);
  }

  const logoutDog = () => {
    setCurrentDog({});
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      // fetch to rails backend
      fetch(baseUrl + '/get-current-dog', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        }
      })
        .then(resp => resp.json())
        .then(dog => loginDog(dog))
    }
  }, [])

  return (
    <Router>
      { loggedIn ? <h1>Hey were logged in</h1> : null }
      <Navbar loggedIn={ loggedIn } logoutDog={ logoutDog } />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup loginDog={ loginDog } />} />
        <Route path="/login" element={<Login loginDog={ loginDog } />} />
      </Routes>
    </Router>
  );
}

export default App;
