import React from 'react'
import { useNavigate } from 'react-router-dom'

const DogHouseCard = ({ dogHouse }) => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={ dogHouse.image_url } alt="dog house image" height="300" width="350" />
      <p>Address: { dogHouse.address }, { dogHouse.state} { dogHouse.zipcode }</p>
      <button onClick={ () => navigate(`/doghouses/${dogHouse.id}`) }>Click For More Info</button>
    </div>
  )
}

export default DogHouseCard
