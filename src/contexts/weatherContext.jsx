import { createContext, useState, useEffect, useReducer } from "react";
import { apiKey1, apiKey2 } from "../../api_key";

const WeatherContext = createContext(null);

function WeatherProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityWeather, dispatchCityWeather] = useReducer(mapCityWeather, {
    currentCity: {
      name: "",
      lon: "",
      lat: "",
      state: "",
      country: "",
    },
    weatherForecasted: [],
    currentWeather: {
      temp: {
        current: 0,
        min: 0,
        max: 0,
      },
      pressure: 0,
      weather: {
        main: "",
        icon: "",
      },
      cloud: {
        coverage: 0,
      },
      wind: {
        speed: 0,
        direction: "",
        gust: 0,
      },
      precipitation: 0,
      visibility: 0,
      humidity: 0,
    },
  });

  useEffect(() => {
    localStorage.setItem("cityWeather", JSON.stringify(cityWeather));
  }, [cityWeather]);
  // Fetch city list when search input changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!city) return;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey1}`
        );
        const result = await response.json();
        setCities(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    const timer = setTimeout(fetchCities, 500);
    return () => clearTimeout(timer);
  }, [city]);

  // Fetch weather data when city coordinates change
  useEffect(() => {
    const fetchWeatherData = async () => {
      const { lat, lon } = cityWeather.currentCity;
      if (!lat || !lon) return;

      try {
        // Fetch current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey1}`
        );
        const currentData = await currentResponse.json();
        dispatchCityWeather({
          type: "map-current-weather",
          currentWeather: currentData,
        });

        // Fetch forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey1}`
        );
        const forecastData = await forecastResponse.json();
        dispatchCityWeather({
          type: "map-forecast",
          forecast: forecastData,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [cityWeather.currentCity]);

  const setCurrentCity = (index) => {
    const selectedCity = cities[index];
    dispatchCityWeather({ type: "map-city", city: selectedCity });
  };
  useEffect(() => {
    const fetchCity = async (lat, lon) => {
      const response = await fetch(
        lat & lon
          ? `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey2}`
          : `https://api.openweathermap.org/geo/1.0/direct?q=addis%20ababa&appid=${apiKey2}`
      );
      const city = await response.json();
      dispatchCityWeather({
        type: "map-city",
        city: city[0],
      });
    };

    if ("geolocation" in navigator) {
      console.log("Geolocation navigator is found!");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { lon, lat, accuracy } = pos.coords;

          fetchCity(lat, lon);
          console.log("Your current position is:");
          console.log(`\t\tLatitude : ${lat}`);
          console.log(`\t\tLongitude: ${lon}`);
          console.log(`\t\tMore or less ${accuracy} meters.`);
        },
        (err) => {
          console.log(err);
          fetchCity().catch((error) => {
            console.error(error);
            const oldCityWeather = JSON.parse(
              localStorage.getItem("cityWeather")
            );
            dispatchCityWeather({
              type: "map-all",
              action: {
                city: oldCityWeather.currentCity,
                forecast: oldCityWeather.weatherForecasted,
                currentWeather: oldCityWeather.currentWeather,
              },
            });
          });
        }
      );
    } else {
      console.log("NO navigator found");
      fetchCity();
    }
  }, []);
  return (
    <WeatherContext.Provider
      value={{
        cities,
        setCity,
        setCurrentCity,
        city,
        cityWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function mapCityWeather(state, action) {
  switch (action.type) {
    case "map-forecast":
      return {
        ...state,
        weatherForecasted:
          action.forecast?.list?.map((item) => ({
            date: {
              str: item.dt_txt,
              unix: item.dt,
            },
            temp: {
              current: item.main?.temp,
              min: item.main?.temp_min,
              max: item.main?.temp_max,
              feelslike: item.main?.feels_like,
            },
            pressure: item.main?.pressure,
            humidity: item.main?.humidity,
            visibility: item.visibility,
            precipitation: item.pop,
            cloud: {
              coverage: item.clouds?.all,
            },
            wind: {
              speed: item.wind?.speed,
              direction: item.wind?.deg,
              gust: item.wind?.gust,
            },
            weather: item.weather?.[0]
              ? {
                  main: item.weather[0].main,
                  icon: item.weather[0].icon,
                  description: item.weather[0].description,
                }
              : null,
          })) || [],
      };

    case "map-current-weather":
      return {
        ...state,
        currentWeather: {
          temp: {
            current: action.currentWeather.main?.temp || 0,
            min: action.currentWeather.main?.temp_min || 0,
            max: action.currentWeather.main?.temp_max || 0,
            feelslike: action.currentWeather.main?.feels_like || 0,
          },
          pressure: action.currentWeather.main?.pressure || 0,
          humidity: action.currentWeather.main?.humidity || 0,
          visibility: action.currentWeather.visibility || 0,
          precipitation: action.currentWeather.rain?.["1h"] || 0,
          cloud: {
            coverage: action.currentWeather.clouds?.all || 0,
          },
          wind: {
            speed: action.currentWeather.wind?.speed || 0,
            direction: action.currentWeather.wind?.deg || 0,
            gust: action.currentWeather.wind?.gust || 0,
          },
          weather: {
            main: action.currentWeather.weather?.[0]?.main || "",
            icon: action.currentWeather.weather?.[0]?.icon || "",
            description: action.currentWeather.weather?.[0]?.description || "",
          },
        },
      };

    case "map-city":
      return {
        ...state,
        currentCity: action.city
          ? {
              name: action.city.name,
              lat: action.city.lat,
              lon: action.city.lon,
              state: action.city.state,
              country: action.city.country,
            }
          : state.currentCity,
      };

    case "map-all":
      return {
        currentCity: action.city,
        weatherForecasted: action.forecast,
        currentWeather: action.currentWeather,
      };
    default:
      return state;
  }
}

export { WeatherContext, WeatherProvider };
