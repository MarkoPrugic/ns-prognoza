import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/sr';
import {Box, Typography} from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const WeatherChart = ({ forecast }) => {
  // Komponenta za prilagođeni tooltip na grafikonu
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const formattedLabel = moment(label).calendar();
      const temperature = payload[0].value;
      const weatherStatus = payload[1].value;
      return (
        <Box className="card-inner" sx={{
          mx: 10,
          mt: 16,
          '& > :not(style)': { m: 4, width: '100%' },
          background: 'rgba(43, 45, 66, 0.5)',
          boxShadow: '0 0 15px rgba(43, 45, 66, 0.3)',
        }}>
          <Box sx={{}}>
            <Typography>
              {formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1)}
            </Typography>
            <br />
            <Typography variant='body2'>
              {`${temperature} °C ${weatherStatus}`}
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  };

  // Funkcija za formatiranje oznaka na X osi grafikona
  const formatXAxis = (forecastData) => {
    moment().locale("sr");
    const formattedLabel = moment(forecastData).calendar();
    return formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1);
  };

  // Funkcija za formatiranje oznaka na Y osi grafikona
  const formatYAxis = (forecastData) => {
    return forecastData + ' °C';
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={forecast}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#EDF2F4" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#381828" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="time" tick={{ fill: '#EDF2F4' }} tickFormatter={formatXAxis} />
      <YAxis tick={{ fill: '#EDF2F4' }} tickFormatter={formatYAxis} />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="temp"
        stroke="#EDF2F4"
        fillOpacity={1}
        fill="url(#gradient)"
        animationDuration={2000}
      />
      <Area
        type="monotone"
        dataKey="weather"
        stroke="#EDF2F4"
        fillOpacity={1}
        fill="url(#gradient)"
        animationDuration={2000}
      />
    </AreaChart>
  </ResponsiveContainer>
);
};

export default WeatherChart;
