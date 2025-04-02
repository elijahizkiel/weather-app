import CurrentCityCard from "./components/CurrentCityCard";
import SearchInput from "./components/SearchInput";
import {HorizontalForecastCards} from "./components/WeatherForecastCards";
import { useContext } from "react";
import { WeatherContext } from "./contexts/weatherContext";
import SideBar from "./components/SideBar";

function App() {
  const { cityWeather } = useContext(WeatherContext);
  return (
    <div className="bg-[#0A121E] w-full h-full md:grid md:grid-cols-10 md:grid-rows-10 gap-4">
      <SideBar className={"bg-[#212A3B] rounded-3xl m-2 md:col-span-1 md:row-start-2 md:row-span-6 flex flex-col items-center justify-start gap-5"} />
      <SearchInput
        className={
          "md:col-start-2 md:col-end-8 md:row-span-1 flex flex-col justify-center align-middle p-5 border-amber-50"
        }
      />
      <CurrentCityCard
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
      <HorizontalForecastCards forecasts={cityWeather.weatherForecasted} />
      
    </div>
  );
}

export default App;
