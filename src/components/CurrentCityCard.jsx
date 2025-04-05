export default function CurrentCityCard({
  city,
  currentTemp,
  currentWeather,
  units,
  className
}) {
  /**
   * @param cityName tell which city's weather forecast is being shown,
   * @param currentTemp tells current time temperature
   * @param currentWeather is object containing weahter icon code, rainingChance and weather
   */
  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-white">{city.name}</h2>
        <p className="text-2xl text-white font-semibold ml-2">
          {city.state}, {city.country}
        </p>
      </div>
      <div className="row-span-2 h-full flex justify-center items-center">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt={currentWeather.weather}
          className="w-full"
        />
      </div>
      <p className="text-4xl text-white font-semibold flex justify-start px-10 items-center">
        {currentTemp}&deg;{units === "celsius" ? "C" : "F"}
      </p>
    </div>
  );
}
