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
    <div className="md:row-span-3 md:row-start-2 md:col-start-2 md:col-end-7 gap-4 p-5 grid grid-cols-2">
      <div className="">
        <h2 className="text-3xl font-bold text-white">{cityName}</h2>
      </div>
      <div className="row-span-2 h-full flex justify-center items-center">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt={currentWeather.weather}
          className="w-full"
        />
      </div>
      <p className="text-4xl text-white font-extrabold">
        {currentTemp}&deg;{units === "celsius" ? "C" : "F"}
      </p>
    </div>
  );
}
