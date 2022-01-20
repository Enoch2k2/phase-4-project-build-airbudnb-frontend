import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DogHouse = ({ dogHouses }) => {
  const [dogHouse, setDogHouse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const dH = dogHouses.find(dH => dH.id.toString() === id);
    setDogHouse(dH);
  }, [id])

  return (
    <div style={{ marginLeft: "20px"}}>
      <img src={ dogHouse.image_url } alt="A dog house image" height="300" width="350" />
      <p>Address:</p>
      <p>{ dogHouse.address }</p>
      <p>{ dogHouse.state } { dogHouse.zipcode }</p>
      <p>{ dogHouse.short_description }</p>
      <button>Click To Book</button>
    </div>
  )
}

export default DogHouse
