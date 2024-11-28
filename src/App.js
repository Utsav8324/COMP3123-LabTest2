import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("default");

  const fetchWeather = async (city) => {
    const apiKey = "c4857478a71c5833751165588ec99488";
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);

      // Set weather condition based on the main weather description
      const condition = weatherResponse.data.weather[0].main.toLowerCase();
      if (condition.includes("cloud")) setWeatherCondition("cloudy");
      else if (condition.includes("rain")) setWeatherCondition("rainy");
      else if (condition.includes("snow")) setWeatherCondition("snowy");
      else if (condition.includes("clear")) setWeatherCondition("sunny");
      else setWeatherCondition("default");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Please try again.");
    }
  };

  return (
    <div className={`app ${weatherCondition}`}>
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather(e.target.value);
          }}
        />
      </div>
      {weatherData && forecastData && (
        <WeatherCard weatherData={weatherData} forecastData={forecastData} />
      )}
    </div>
  );
};

export default App;