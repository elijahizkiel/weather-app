import CurrentCityCard from "./components/CurrentCityCard";
import SearchInput from "./components/SearchInput";
import { useContext } from "react";
import { WeatherContext } from "./contexts/weatherContext";
function App() {
  const { cityWeather } = useContext(WeatherContext);
  return (
    <div className="bg-blue-900 w-full h-full">
      <SearchInput
        className={
          "flex  flex-col justify-center align-middle p-5 border-amber-50"
        }
      />
      <CurrentCityCard
        cityName={cityWeather?.currentCity?.name || "Addis"}
        currentTemp={cityWeather?.currentWeather?.temp -273|| 20 }
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
    </div>
  );
}

export default App;
