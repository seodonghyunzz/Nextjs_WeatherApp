'use client';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Seoul');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherMain , setWeatherMain] = useState('Clear');
  const cities = [
    'Seoul',
    'Busan',
    'Daegu',
    'Incheon',
    'Gwangju',
    'Daejeon',
    'Ulsan',
    'Suwon',
    'Changwon',
    'Goyang'
  ];
  const weatherImages = {
    Clear: 'clear.png',
    Clouds: 'clouds.png',
    Rain: 'rain.png',
    Drizzle: 'drizzle.png',
    Thunderstorm: 'thunder.png',
    Snow: 'snow.png',
    Mist: 'mist.png',
    Dust: 'dust.png',
    Fog: 'fog.png',
  };
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      setWeather(data);
      setWeatherMain(data.weather[0].main)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather(city);
  };
  
  const getWeatherImage = (main) => {
    return weatherImages[main] || 'default.png'
  }
  const weatherImage = getWeatherImage(weatherMain);
  console.log(weatherImage)
  
  return (
    <div className='root'>
      <div className='Main_Container'>
        <div className='Weather_Container'>
        <h1>Weather App</h1>
        
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && ( 
          <div className='Weather_Wrapper'>
            <div>
              <h2>{weather.name}</h2>
            </div>
            <div className='Weather_Info'>
              <div className='Weather_Inner'>
                <form onSubmit={handleSearch}>
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                      ))}
                  </select>
                  </form>
                </div>
                <div className='Weather_Inner'>
                  <img src={weatherImage} width={60} height={60} className='Weather_Img'/>
                  <p className='Weather_Temp'>{weather.main.temp.toFixed(1)}°C</p>
                </div>
                <div className='Weather_Inner'>
                  <p className='Weather_Humodity'><img src='humidity.png' width={15} height={15}/>{weather.main.humidity}%</p>
                </div>
            </div>
          </div>
        )}
        </div>
      </div>              
    </div>
  );
}