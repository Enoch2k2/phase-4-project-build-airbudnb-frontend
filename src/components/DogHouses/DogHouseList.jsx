import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DogHouseCard from './DogHouseCard';

const DogHouseList = ({ loggedIn, dogHouses }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if( !loggedIn ) {
      navigate('/login');
    }
  }, [loggedIn])

  const dogHouseCards = dogHouses.map(dogHouse => <DogHouseCard key={ dogHouse.id } dogHouse={ dogHouse } />)

  return (
    <div>
      <h1>Dog Houses</h1>
      { dogHouseCards }
    </div>
  )
}

export default DogHouseList
