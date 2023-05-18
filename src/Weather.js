const Weather = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}?latitude=45.25&longitude=19.84&hourly=temperature_2m&current_weather=true`);
    const data = await response.json();
    return data;
}
export default Weather;