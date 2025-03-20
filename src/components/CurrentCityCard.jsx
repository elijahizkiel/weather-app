export default function CurrentCityCard({
  cityName,
  currentTemp,
  currentWeather,
  units,
}) {
  /**
   * @param cityName tell which city's weather forecast is being shown,
   * @param currentTemp tells current time temperature
   * @param currentWeather is object containing weahter icon code, rainingChance and weather
   */
  return (
    <div className="current-city-weather">
      <div className="city-name-box">
        <h2 className="city-name">{cityName}</h2>
        <span className="rain-chance">
          {currentWeather.rainingChance}
        </span>
      </div>
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt={currentWeather.weather}
        />
      </div>
      <p>
        {currentTemp}&deg;{units === "celsius" ? "C" : "F"}
      </p>
    </div>
  );
}
