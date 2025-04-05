import CurrentCityCard from "./components/CurrentCityCard";
import SearchInput from "./components/SearchInput";
import {HorizontalForecastCards, VerticalForecastCards} from "./components/WeatherForecastCards";
import { useContext } from "react";
import { WeatherContext } from "./contexts/weatherContext";
import SideBar from "./components/SideBar";

function App() {
  const { cityWeather } = useContext(WeatherContext);
  return (
    <div className="bg-[#0A121E] w-screen md:min-h-screen md:max-h-max md:grid md:grid-cols-10 md:grid-rows-10 gap-2">
      <SideBar className={"bg-[#212A3B] rounded-3xl m-2 md:col-span-1 md:row-start-2 md:row-span-6 flex flex-col items-center justify-start gap-5"} />
      <SearchInput
        className={
          "md:col-start-2 md:col-end-8 md:row-span-1 flex flex-col justify-center align-middle p-1 h-fit border-amber-50"
        }
      />
      <CurrentCityCard
        className={"md:row-span-3 md:row-start-2 md:col-start-2 md:col-end-7 gap-4 p-5 grid grid-cols-2"}
        cityName={cityWeather?.currentCity?.name}
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
      <HorizontalForecastCards forecasts={cityWeather.weatherForecasted} className={"md:row-start-5 md:row-span-3 md:col-start-2 md:col-end-8 py-2 rounded-xl bg-[#212A3B] px-5 "} />
      <VerticalForecastCards forecasts={getDailyForecast(cityWeather.weatherForecasted)} className={`md:col-start-8 md:col-end-11 md:row-start-2 md:row-span-6 py-2 rounded-xl bg-[#212A3B] px-5 grid grid-cols-1 gap-2`} />
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