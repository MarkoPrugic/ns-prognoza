import './App.css';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WeatherChart from './components/WeatherChart';
import { weatherStatusMap } from './components/WeatherStatusMap';

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    image: '',
    weatherStatus: '',
    forecast: []
  });

  useEffect(() => {
    getWeather();
  }, []);

const getWeather = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const jsonData = await response.json();

      const { weathercode } = jsonData.current_weather;
      const { status, image } = weatherStatusMap[weathercode];

      const forecastTime = jsonData.hourly.time.slice(24, 72);
      const forecastTemperature = jsonData.hourly.temperature_2m.slice(24, 72);
      const forecastWeatherCode = jsonData.hourly.weathercode.slice(24, 72);

      const forecastWeather = forecastWeatherCode.map(code => weatherStatusMap[code].status);

      const forecastData = forecastTime.map((time, index) => ({
        id: Math.random(),
        time,
        temp: forecastTemperature[index],
        weather: forecastWeather[index],
      }));

      setWeatherData({
        temperature: Math.round(jsonData.current_weather.temperature),
        image,
        weatherStatus: status,
        forecast: forecastData
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  
  const { temperature, image, weatherStatus, forecast } = weatherData;

  return (
    <div className="App">
      <Box className="container">
        <div className="circle"><img alt='Ilustracija' src={image} style={{ height: '350px', width: '350px' }} /></div>
        <div className="circle"><img alt='Ilustracija' src={image} style={{ height: '350px', width: '350px' }} /></div>
        <Box className="card-inner" sx={{ background: 'rgba(143, 143, 143, 0.1)', '& > :not(style)': { m: 0, width: '100%' }, mx: 10, mt: 10, flexWrap: 'wrap' }}>
          <Box className="card-inner" sx={{ background: 'rgba(43, 45, 66, 0.1)', '& > :not(style)': { m: 4, width: '100%' }, alignItems: 'center', boxShadow: '0 0 15px rgba(43, 45, 66, 0.3)', }}>
            <Box>
              <Typography variant="h2">
                Trenutna temperatura: {temperature} °C
              </Typography>
              <br />
              <Typography variant="h4">
                {weatherStatus}
              </Typography>
            </Box>
            <img alt='Glavna ilustracija' src={image} style={{ height: '300px', width: '300px', background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0) 50%)' }} />
          </Box>
          <WeatherChart forecast={forecast} />
        </Box>
      </Box>
    </div>
  );
}

export default App;