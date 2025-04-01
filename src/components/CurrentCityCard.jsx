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
    <div className="gap-4 p-5 grid grid-cols-2">
      <div className="">
        <h2 className="text-2xl font-bold text-white">{cityName}</h2>
        <span className="text-sm text-gray-400">
          Raining Chance: {currentWeather.precipitation*100}%
        </span>
      </div>
      <div className="row-span-2 h-full">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt={currentWeather.weather}
        />
      </div>
      <p className="text-xl text-gray-50">
        {currentTemp}&deg;{units === "celsius" ? "C" : "F"}
      </p>
    </div>
  );
}
