import CurrentCityCard from "./components/CurrentCityCard";
import SearchInput from "./components/SearchInput";
import SideBar from "./components/SideBar";
import TodaysCondition from "./components/TodaysCondition";
import {
  HorizontalForecastCards,
  VerticalForecastCards,
} from "./components/WeatherForecastCards";

import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "./contexts/WeatherContext";

function App() {
  const { cityWeather } = useContext(WeatherContext);
  useEffect(()=> {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange =  (e) => {
    setDarkmode(e.matches);
  }
  systemTheme.addEventListener("change", handleThemeChange);

  return ()=> systemTheme.removeEventListener('change', handleThemeChange);
}, [])
  const [darkmode, setDarkmode] = useState((window.matchMedia("(prefers-color-scheme: dark)")).matches);
  return (
    <div
      className={`w-[99vw] px-2 overflow-x-clip md:h-full md:grid md:grid-cols-10 md:grid-rows-[repeat(13,_56px)] gap-2 ${
        darkmode ? "dark bg-[#0A121E]" : "bg-radial to-60% to-[#AFDDFF] from-[#f5f5f5]"
      }`}
    >
      <SideBar
        className={
          "bg-[#60b5ff] dark:bg-[#212A3B] rounded-3xl m-2 md:col-span-1 md:row-start-2 md:row-span-8 flex flex-col items-center justify-start gap-5"
        }
        iconClasses={"flex flex-col cursor-pointer my-5 text-grey-500 dark:text-white text-2xl"}
        titleClasses={" text-grey-500 dark:text-gray-200 text-sm"}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
      />
      <SearchInput
        className={
          "md:col-start-2 md:col-end-8 md:row-span-1 flex flex-col justify-center items-center my-2 p-1 h-fit border-amber-50"
        }
        inputClasses={"text-white mx-3 rounded-2xl p-3 outline-0 w-full bg-[#60b5ff] dark:bg-[#212A3B]"}
      />
      <CurrentCityCard
        className={
          "md:row-start-2 md:row-span-3 md:col-start-2 md:col-end-8 gap-4 p-5 grid grid-cols-2 grid-rows-2 text-black dark:text-white"
        }
        city={cityWeather?.currentCity}
        currentTemp={convertToCelsius(cityWeather?.currentWeather?.temp.current)}
        units={"celsius"}
        currentWeather={cityWeather?.currentWeather?.weather}
      />
      <HorizontalForecastCards
        forecasts={cityWeather.weatherForecasted}
        className={
          "md:row-start-5 md:row-end-9 md:col-start-2 md:col-end-8 md:flex md:flex-col md:items-start md:justify-evenly pt-0 pb-3 rounded-xl bg-[#60b5ff] dark:bg-[#212A3B] px-5 "
        }
      />
      <VerticalForecastCards
        forecasts={getDailyForecast(cityWeather.weatherForecasted)}
        className={`md:col-start-8 md:col-end-11 md:row-start-2 md:row-span-8 py-2 px-5 rounded-xl bg-[#60b5ff] dark:bg-[#212A3B] text-grey-500 dark:text-gray-400`}
      />
      <TodaysCondition
        className="md:col-start-2 md:col-end-8 md:row-start-10 md:row-end-13 text-grey-500 dark:text-gray-400 bg-[#60b5ff] dark:bg-[#212A3B] rounded-2xl p-5"
        currentWeather={cityWeather.currentWeather}
      />
      <footer className="md:col-start-1 md:col-end-11 md:row-start-13 md:row-end-14 md:flex md:justify-center md:items-center text-black dark:text-white text-sm font-light">
        <p>Developed by @elijahizkiel</p>
        <p className="mx-2">|</p>
        <p>&copy; {new Date(Date.now()).getUTCFullYear()},</p>
        <p className="mx-2">|</p>
        <p>All rights reserved</p>
        <p className="mx-2">|</p>
        <p>Powered By OpenWeather API</p>
      </footer>
    </div>
  );
}

export default App;

function getDailyForecast(forecasts) {
  if (!forecasts) {
    return [];
  }
  const groupedByDate = {};
  forecasts.forEach((forecast) => {
    const date = forecast.date.str.split(" ")[0];

    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(forecast);
  });
  const dates = Object.keys(groupedByDate);
  let dailyForecasts= [];

  for (const date of dates) {
    const maxTemps = groupedByDate[date].map((forecastItem) => forecastItem.temp.max);
    const minTemps = groupedByDate[date].map((forecastItem) => forecastItem.temp.min);

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
    const weatherMatched = weathers.find(
      (weather) => weather.main === frequentWeather
    );
    dailyForecasts = [
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
              icon: weatherMatched.icon || "01d",
              description: weatherMatched.description || "No description",
            },
          },
        ]
  }
  return dailyForecasts;
}

function convertToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}
function convertToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}