const Weather = ({ weather }) => {
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <div>Temperature: {weather.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <div>Wind: {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather;