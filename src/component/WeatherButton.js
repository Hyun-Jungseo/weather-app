import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities,selectedCity,handleCityChange}) => {
  // console.log("cities?", cities);
  return (
    <div className='weather-button-box'>
       {/* <Button className='weather-button' variant="secondary"
       onClick={() => handleCityChange("current")}>Current Location</Button> */}
       
       <Button
        className='weather-button'
        variant={`${selectedCity == null ? "outline-warning" : "warning"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city) => (
        <Button 
          className='weather-button'
          variant={`${selectedCity == city ? "outline-warning" : "warning"}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
          </Button>
        ))}
      </div>
  );
};

export default WeatherButton;