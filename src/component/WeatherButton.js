import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className='weather-button-box'>
       <Button className='weather-button' variant="secondary">Current Location</Button>
       <Button className='weather-button' variant="secondary">paris</Button>
       <Button className='weather-button' variant="secondary">new york</Button>
    </div>
  )
}

export default WeatherButton