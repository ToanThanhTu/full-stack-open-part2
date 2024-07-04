import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`;

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}&lat=${lat}&lon=${lon}`);
    return request.then(response => response.data);
}

export default { getWeather };