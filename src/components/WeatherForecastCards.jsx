import WeatherCard from "./WeatherCard";

const HorizontalForecastCards = ({ forecasts, className }) => {
  forecasts = Array.isArray(forecasts)
    ? forecasts.filter((forecast) => {
        const today = new Date(Date.now() + 86400000).toLocaleDateString();
        const dateOfForecast = new Date(
          forecast.date.str.split(" ")[0]
        ).toLocaleDateString();
        console.log(today);
        return dateOfForecast === today;
      })
    : [];
  return (
    <div className={className}>
      <p className="text-gray-400 uppercase font-semibold text-base my-3">Today's Forecast </p>     
      <div className="gap-1 md:grid grid-cols-8">
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
  return (
    <div className={className}>  
      {forecasts?forecasts.map((forecast, index) => {
        const { weather, temp, date } = forecast;
        return (
          <WeatherCard
            key={index}
            weather={weather}
            temp={temp}
            time={(new Date(date)).toLocaleDateString("en-US", {
              weekday: "long",
            })}
            isVertical={true}
          />
        );
      }):<p className="text-gray-400">No forecast available</p>}
    </div>
  );
};

export { HorizontalForecastCards, VerticalForecastCards };
