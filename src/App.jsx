import CurrentCityCard from "./components/CurrentCityCard";
import SearchInput from "./components/SearchInput";
import {HorizontalForecastCards, VerticalForecastCards} from "./components/WeatherForecastCards";
import { useContext } from "react";
import { WeatherContext } from "./contexts/weatherContext";
import SideBar from "./components/SideBar";

function App() {
  const { cityWeather } = useContext(WeatherContext);
  return (
    <div className="bg-[#0A121E] w-[99vw] px-2 overflow-x-clip md:h-full md:grid md:grid-cols-10 md:grid-rows-[repeat(11,_56px)] gap-2">
      <SideBar className={"bg-[#212A3B] rounded-3xl m-2 md:col-span-1 md:row-start-2 md:row-span-8 flex flex-col items-center justify-start gap-5"} />
      <SearchInput
        className={
          "md:col-start-2 md:col-end-8 md:row-span-1 flex flex-col justify-center items-center my-2 p-1 h-fit border-amber-50"
        }
      />
      <CurrentCityCard
        className={"md:row-start-2 md:row-span-4 md:col-start-2 md:col-end-8 gap-4 p-5 grid grid-cols-2 grid-rows-2"}
        city={cityWeather?.currentCity}
        currentTemp={(cityWeather?.currentWeather?.temp.current - 273).toFixed(
          2
        )}
        units={"celsius"}
        currentWeather={
          cityWeather?.currentWeather?.weather
            ? {
                ...cityWeather?.currentWeather?.weather,
                precipitation: cityWeather?.currentWeather?.precipitation,
              }
            : {
                weather: "Sunny",
                icon: "01d",
                precipitation: 0.45,
              }
        }
      />
      <HorizontalForecastCards forecasts={cityWeather.weatherForecasted} className={"md:row-start-6 md:row-span-4 md:col-start-2 md:col-end-8 md:flex md:flex-col md:items-start md:justify-between py-5 rounded-xl bg-[#212A3B] px-5 "} />
      <VerticalForecastCards forecasts={getDailyForecast(cityWeather.weatherForecasted)} className={`md:col-start-8 md:col-end-11 md:row-start-2 md:row-span-8 py-2 rounded-xl bg-[#212A3B] px-5 grid grid-cols-1 grid-rows-[repeat(6,70px)] gap-5`} />
      <div className="col-start-1 col-end-11 row-start-10 row-end-12 flex justify-center items-center text-white text-sm font-light">
        <p>Developed by @elijahizkiel</p>
        <p className="mx-2">|</p>
        <p>&copy; {new Date(Date.now()).getUTCFullYear()}</p>
        <p className="mx-2">|</p>
        <p>All rights reserved</p>
        <p className="mx-2">|</p>
        <p>Powered By OpenWeather API</p>
      </div>
    </div>
  );
}

export default App;

function getDailyForecast(forecasts) {
  const groupedByDate = {};
  forecasts.forEach((forecast) => {
    const date = forecast.date.str.split(" ")[0];
  
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(forecast);
  });
  const dates = Object.keys(groupedByDate);
  let dailyForecasts;
  
  for (const date of dates) {
    const maxTemps = groupedByDate[date].map((i) => i.temp.max);
    const minTemps = groupedByDate[date].map((i) => i.temp.min);

    const minTemp = minTemps.reduce((a, b) => Math.min(a, b));
    const maxTemp = maxTemps.reduce((a, b) => Math.max(a, b));
    const avgHumidity =
      groupedByDate[date].reduce((sum, i) => {
        return sum + i.humidity;
      }, 0) / groupedByDate[date].length;

    const weathers = groupedByDate[date].map((i) => {
      return {
        main: i.weather.main,
        icon: i.weather.icon,
        description: i.weather.description,
      };
    });

    const weathersCount = {};
    weathers.forEach((weather) => {
      weathersCount[weather.main] = (weathersCount[weather.main] || 0) + 1;
    });
    const frequentWeather = Object.keys(weathersCount).reduce((a, b) =>
      weathersCount[a] > weathersCount[b] ? a : b
    );
    
    dailyForecasts =dailyForecasts?[
      ...dailyForecasts,
       {
        temp: {
          min: minTemp,
          max: maxTemp,
        },
        date: date,
        avgHumidity: avgHumidity,
        weather: {
          main: frequentWeather,
          icon: weathers.find((weather) => weather.main === frequentWeather)
            .icon,
          description: weathers.find(
            (weather) => weather.main === frequentWeather
          ).description,
        },
      },
    ]:[
      {
        temp: {
          min: minTemp,
          max: maxTemp,
        },
        date: date,
        avgHumidity: avgHumidity,
        weather: {
          main: frequentWeather,
          icon: weathers.find((weather) => weather.main === frequentWeather)
            .icon,
          description: weathers.find(
            (weather) => weather.main === frequentWeather
          ).description,
        },
      },
    ];
  }
  return dailyForecasts;
}