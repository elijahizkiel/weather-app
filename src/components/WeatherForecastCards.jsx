import WeatherCard from "./WeatherCard";

const HorizontalForecastCards = ({ forecasts }) => {
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
    <div className="md:row-start-5 md:row-span-2 md:col-start-2 md:col-end-8 gap-1 py-2 rounded-xl md:grid grid-cols-8 bg-[#212A3B] px-5 ">
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
  );
};

const VerticalForecastCards = ({ forecasts }) => {
  return (
    <div className="weather-forecast-cards flex flex-col justify-center gap-4">
      {forecasts.map((forecast, index) => {
        const { weather, temp, date } = forecast;
        return (
          <WeatherCard
            key={index}
            weather={weather}
            temp={temp}
            time={date.str.split(" ")[1].slice(0, 5)}
            isVertical={true}
          />
        );
      })}
    </div>
  );
};

export { HorizontalForecastCards, VerticalForecastCards };
