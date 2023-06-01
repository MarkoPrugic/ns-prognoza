import './App.css';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WeatherChart from './components/WeatherChart';
import { weatherStatusMap } from './components/WeatherStatusMap';

function App() {
  // Definišanje početnog stanja koristeći useState
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    image: '',
    weatherStatus: '',
    forecast: []
  });
  // Učitavanje vremenskih podataka pri montiranju komponente
  useEffect(() => {
    getWeather();
  }, []);

// Funkcija za dobijanje vremenskih podataka putem API-ja
const getWeather = async () => {
    try {
      // Slanje zahteva za dobijanje vremenskih podataka
      const response = await fetch(process.env.REACT_APP_API_URL);
      const jsonData = await response.json();

      // Dobijanje trenutnog vremenskog koda i odgovarajućeg statusa i slike
      const { weathercode } = jsonData.current_weather;
      const { status, image } = weatherStatusMap[weathercode];

      // Izdvajanje vremenskih podataka za prognozu
      const forecastTime = jsonData.hourly.time.slice(24, 72);
      const forecastTemperature = jsonData.hourly.temperature_2m.slice(24, 72);
      const forecastWeatherCode = jsonData.hourly.weathercode.slice(24, 72);

      // Dobijanje statusa vremena za prognozu na osnovu vremenskog koda
      const forecastWeather = forecastWeatherCode.map(code => weatherStatusMap[code].status);

      // Formiranje podataka za prikaz na grafikonu
      const forecastData = forecastTime.map((time, index) => ({
        id: Math.random(),
        time,
        temp: forecastTemperature[index],
        weather: forecastWeather[index],
      }));

      // Postavljanje vremenskih podataka u stanje
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
  
  // Destrukturiranje vremenskih podataka iz stanja
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