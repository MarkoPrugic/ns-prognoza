import './App.css';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WeatherChart from './components/WeatherChart';

function App() {
  const [temperature, setTemperature] = useState(0); // Trenutna temperatura
  const [image, setImage] = useState(''); // Slika za prikaz vremenskih uslova
  const [weatherStatus, setWeatherStatus] = useState(''); // Status vremena
  const [forecast, setForecast] = useState([]); // Prognoza vremena

  useEffect(() => {
    GetWeather();
  }, []);

  const GetWeather = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL); // Uzimanje podataka o vremenu sa API-ja
      const jsonData = await response.json(); // Parsiranje odgovora u JSON format
      setTemperature(Math.round(jsonData.current_weather.temperature)); // Postavljanje trenutne temperature
      
      // Mapiranje vremenskih kodova na odgovarajući status i sliku
      const weatherStatusMap = {
        0:    { status: 'Čisto nebo',                                 image: '/res/sunny.svg' },
        1:    { status: 'Uglavnom čisto',                             image: '/res/cloudy.svg' },
        2:    { status: 'Delimično oblačno',                          image: '/res/cloudy.svg' },
        3:    { status: 'Oblačno',                                    image: '/res/cloudy.svg' },
        45:   { status: 'Maglovito',                                  image: '/res/fog.svg' },
        48:   { status: 'Maglovito',                                  image: '/res/fog.svg' },
        51:   { status: 'Sitna kisa',                                 image: '/res/drizzle.svg' },
        53:   { status: 'Sitna kisa',                                 image: '/res/drizzle.svg' },
        55:   { status: 'Sitna kisa',                                 image: '/res/drizzle.svg' },
        56:   { status: 'Sitna kisa',                                 image: '/res/drizzle.svg' },
        57:   { status: 'Sitna kisa',                                 image: '/res/drizzle.svg' },
        61:   { status: 'Kisa - Blag intenzitet',                     image: '/res/rain.svg' },
        63:   { status: 'Kisa - Umeren intenzitet',                   image: '/res/rain.svg' },
        65:   { status: 'Kisa - Jak intenzitet',                      image: '/res/extreme-rain.svg' },
        66:   { status: 'Ledena kisa - Lagan intenzitet',             image: '/res/sleet.svg' },
        67:   { status: 'Ledena kisa - Jak intenzitet',               image: '/res/sleet.svg' },
        71:   { status: 'Sneg',                                       image: '/res/snow.svg' },
        73:   { status: 'Sneg',                                       image: '/res/snow.svg' },
        75:   { status: 'Sneg',                                       image: '/res/snow.svg' },
        77:   { status: 'Sneg',                                       image: '/res/snow.svg' },
        80:   { status: 'Kišni pljuskovi - Blag intenzitet',          image: '/res/extreme-rain.svg' },
        81:   { status: 'Kišni pljuskovi - Umeren intenzitet',        image: '/res/extreme-rain.svg' },
        82:   { status: 'Kišni pljuskovi - Jak intenzitet',           image: '/res/extreme-rain.svg' },
        85:   { status: 'Snežni pljuskovi - Blag intenzitet',         image: '/res/extreme-snow.svg' },
        86:   { status: 'Snežni pljuskovi - Jak intenzitet',          image: '/res/extreme-snow.svg' },
        95:   { status: 'Grmljavina',                                 image: '/res/thunderstorms.svg' },
        96:   { status: 'Grmljavina',                                 image: '/res/thunderstorms.svg' },
        99:   { status: 'Grmljavina',                                 image: '/res/thunderstorms.svg' },
      };

      // Dobijanje statusa i slike na osnovu trenutnog vremenskog koda
      const { status, image } = weatherStatusMap[jsonData.current_weather.weathercode];
      setWeatherStatus(status);
      setImage(image);

      // Izdvajanje podataka za prognozu iz dobijenih podataka
      const forecastTime = jsonData.hourly.time.slice(24, 72);
      const forecastTemperature = jsonData.hourly.temperature_2m.slice(24, 72);
      const forecastWeatherCode = jsonData.hourly.weathercode.slice(24, 72);

      // Mapiranje vremenskih kodova prognoze na odgovarajući status
      const forecastWeather = forecastWeatherCode.map(code => weatherStatusMap[code].status);

      // Kreiranje objekata sa podacima za prikaz na grafikonu
      const forecastData = forecastTime.map((time, index) => ({
        id: Math.random(),
        time,
        temp: forecastTemperature[index],
        weather: forecastWeather[index],
      }));

      setForecast(forecastData); // Postavljanje podataka za prognozu
    }
    catch (error) {
      console.error('greska: ', error); // Prikazivanje greške u konzoli
    }
  };

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