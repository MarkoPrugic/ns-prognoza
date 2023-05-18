import './App.css';
import { useState } from 'react';
import Weather from './Weather';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function App() {
  const [temperature, setTemperature] = useState(0);
  const [image, setImage] = useState('');
  const [weatherStatus, setWeatherStatus] = useState('');

  const GetWeather = async () => {
    const data = await Weather();
    setTemperature(Math.round(data.current_weather.temperature));
    switch (data.current_weather.weathercode) {
      case 0:
        setWeatherStatus('Vedro');
        setImage('/res/sunny.png');
        break;
      case 1 || 2 || 3:
        setWeatherStatus('Oblacno');
        setImage('');
        break;
      case 45 || 48:
        setWeatherStatus('Maglovito');
        setImage('');
        break;
      case 51 || 53 || 55 || 56 || 57:
        setWeatherStatus('Sitna kisa');
        setImage('');
        break;
      case 61 || 63 || 65:
        setWeatherStatus('Kisa');
        setImage('');
        break;
      case 66 || 67:
        setWeatherStatus('Ledena kisa');
        setImage('');
        break;
      case 71 || 73 || 75 || 77:
        setWeatherStatus('Sneg');
        setImage('');
        break;
      case 80 || 81 || 82:
        setWeatherStatus('Pljusak');
        setImage('');
        break;
      case 95 || 96 || 99:
        setWeatherStatus('Grmljavina');
        setImage('/res/thunderstorm.png');
        break;
    }
    console.log(data.current_weather);
  }
  GetWeather();

  return (
    <div className="App">
      <Card sx={{ position: 'relative', mx: 10, mt: 16, background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 75%)' }} elevation={0}>
        <CardMedia sx={{
          mx:2,
          float:'right',
          width:'24rem'
        }}
          component="img"
          alt="Weather ilustration"
          src={image}
        />
        <CardContent sx={{ backgroundColor: 'white' }}>
          <Typography gutterBottom variant="h5" component="div">
            Trenutna temperatura: {temperature} °C
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {weatherStatus}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
