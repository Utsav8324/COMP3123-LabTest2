import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData, forecastData }) => {
  if (!weatherData || !forecastData) return null;

  const { name, weather, main, wind, sys } = weatherData;

  // Filter forecast to get one forecast per day (e.g., midday data)
  const dailyForecast = forecastData.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  return (
    <div className="weather-container">
      {/* Current Weather Card */}
      <div className="current-weather-card">
        <h2>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</h2>
        <p>{new Date().toLocaleDateString()}</p>
        <h3>
          {name}, {sys.country}
        </h3>
        <p className="temperature">{Math.round(main.temp - 273.15)}°C</p>
        <p>{weather[0].description}</p>
        <div className="details">
          <p>Humidity: {main.humidity}%</p>
          <p>Pressure: {main.pressure} hPa</p>
          <p>Wind: {wind.speed} m/s</p>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="forecast-card">
        <h3>5-Day Forecast</h3>
        <div className="forecast-items">
          {dailyForecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <p>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="forecast icon"
              />
              <p>{Math.round(day.main.temp - 273.15)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;