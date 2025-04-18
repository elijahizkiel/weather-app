import WeatherCard from "./WeatherCard";

const HorizontalForecastCards = ({ forecasts, className }) => {
  forecasts = Array.isArray(forecasts)
    ? forecasts.filter((forecast) => {
        const today = new Date(Date.now() + 86400000).toLocaleDateString();
        const dateOfForecast = new Date(
          forecast.date.str.split(" ")[0]
        ).toLocaleDateString();
        return dateOfForecast === today;
      })
    : [];
  return (
    <div className={className}>
      <p className="text-gray-400 uppercase font-semibold text-base my-3">Today's Forecast </p>     
      <div className="gap-1 md:grid grid-cols-8 w-full">
      {forecasts.map((forecast, index) => {
        const { weather, temp, date } = forecast;
        return (
          <WeatherCard
            key={index}
            weather={weather}
            temp={temp}
            time={date.str.split(" ")[1].slice(0, 5)}
            isVertical={false}
          />
        );
      })}
      </div>
    </div>
  );
};

const VerticalForecastCards = ({ forecasts, className }) => {
  forecasts = Array.isArray(forecasts)
    ? forecasts.filter((forecast) => {
        const today = new Date(Date.now()).toLocaleDateString();
        const dateOfForecast = new Date(
          forecast.date
        ).toLocaleDateString();
        return dateOfForecast !== today;
      })
    : []; 
  return (
    <div className={className}> 
    <p>Next 5 Days Weather</p> 
      <div className="md:grid md:grid-cols-1 md:grid-rows-[repeat(5,70px)] sm:flex sm:flex-row sm:flex-wrap gap-5">
      {forecasts?forecasts.map((forecast, index) => {
        const { weather, temp, date } = forecast;
        return (
          <WeatherCard
            key={index}
            weather={weather}
            temp={temp}
            time={(new Date(date)).toLocaleDateString("en-US", {
              weekday: "short",
            })}
            isVertical={true}
          />
        );
      }):<p >No forecast available</p>}
    </div>
    </div>
  );
};

export { HorizontalForecastCards, VerticalForecastCards };
