import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DogHouseList = ({ loggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if( !loggedIn ) {
      navigate('/login');
    }
  }, [loggedIn])

  return (
    <div>
      <h1>Dog Houses</h1>
    </div>
  )
}

export default DogHouseList
