
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useCallback} from 'react';
import { Container } from "react-bootstrap";
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


//1. 앱이 실행되자마자 현재위치기반 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨 상태정보가 보인다.
//3. 5개의 버튼이 있다. (현재위치/ 다른도시 4개)
//4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.


const cities=['paris', 'new york', 'tokyo', 'seoul'];
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {

  const [loading,setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState("");
  
  // const getCurrentLocation = useCallback(() => {
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     let lat = position.coords.latitude
  //     let lon = position.coords.longitude
  //     getWeatherByCurrentLocation(lat, lon)});
  // }, []); 

  const getWeatherByCurrentLocation = async(lat, lon) => {

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&units=imperial`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

    // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=23e2ef053d51932ae1238c27595d29ad&units=metric&units=imperial`;
    // setLoading(true);
    // let response = await fetch(url);
    // let data = await response.json();
    // console.log("data:",data);
    // setWeather(data);
    // setLoading(false);


  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  },[]
)

  const getWeatherByCity = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&units=imperial`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }, [city])

  // const getWeatherByCity = async() => {
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23e2ef053d51932ae1238c27595d29ad&units=metric&units=imperial`
  //   setLoading(true);
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   setWeather(data);
  //   setLoading(false);
  //   // console.log("Data", data)
  // }

  
  useEffect(()=>{
    if(city === null) {
      setLoading(true);
      getCurrentLocation();
    }else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);
  
  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <>
    <Container>
      {loading ? (
        <div>
          <ClipLoader color="#f88c6b" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
        ) :  !apiError ? (
      <div className='container'>
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
      </div>
      ) : (
        apiError
      )}
    </Container>
    </>
  );
};

export default App;
