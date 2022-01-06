import React, { useEffect, useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/static/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import { baseUrl, headers, getToken } from './Globals';
import DogHouseList from './components/DogHouses/DogHouseList';
import DogHouse from './components/DogHouses/DogHouse';

const App = () => {
  const [currentDog, setCurrentDog] = useState({});
  const [dogHouses, setDogHouses] = useState([])
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

    if(loggedIn) {
      fetch(baseUrl + '/dog_houses', {
        headers: {
          ...headers,
          ...getToken()
        }
      })
        .then( resp => resp.json())
        .then( data => setDogHouses( data ))
    }
  }, [loggedIn])

  return (
    <Router>
      <Navbar loggedIn={ loggedIn } logoutDog={ logoutDog } currentDog={ currentDog } />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup loginDog={ loginDog } loggedIn={ loggedIn } />} />
        <Route path="/login" element={<Login loginDog={ loginDog } loggedIn={ loggedIn } />} />
        <Route path="/doghouses" element={<DogHouseList loggedIn={ loggedIn } dogHouses={ dogHouses } />} />
        <Route path="/doghouses/:id" element={<DogHouse loggedIn={ loggedIn } dogHouses={ dogHouses } />} />
      </Routes>
    </Router>
  );
}

export default App;
