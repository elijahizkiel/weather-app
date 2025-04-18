export default function TodaysCondition({ currentWeather, className }) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center p-2 rounded-lg">
      <p className="uppercase font-semibold text-base my-3">Air Conditions</p>
      <button>See more</button>
      </div>{currentWeather ? (
        <div className="md:grid md:grid-cols-2 sm:grid-cols-1 sm: md:grid-rows-2 p-2 dark:text-white text-white">
          <div>
            
            Real feel:{(currentWeather.temp.feelsLike - 273.15).toPrecision(2)}
            &deg;
          </div>
          <div>
            Wind Speed:{(currentWeather.wind.speed * 3.6).toPrecision(3)}km/h
          </div>
          <div>Humidity: {currentWeather.humidity.toPrecision(2)}</div>
          <div>Cloud Coverage:{currentWeather.cloud.coverage}%</div>
        </div>
      ) : (
        "No Forecast!"
      )}
    </div>
  );
}
