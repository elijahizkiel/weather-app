import { createContext, useState, useEffect } from "react";
import apiKey1 from "../../api_key";
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
      timezone: "",
    }, //stores the name of city, its coordinates, state and country
    weatherForecasted: [
      {
        date: {
          str: "",
          unix: 0,
        },
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
        uv: 0,
        airQuality: 0,
        wind: {
          speed: 0,
          direction: "",
          gust: 0,
        },
        preciptation: 0,
        visibility: 0,
        humidity: 0,
      },
    ], //stores weather of consecutive five days of the city as object containing detail info of weather and date
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
      uv: 0,
      preciptation: 0,
      visibility: 0,
      humidity: 0,
    },
  });

  /** 
   * useEffect to fetch name of cities when the user writes name on the desired city on 
   * the search bar. It returns up to 10 cities with the similar beginning to the written character  
   */
  useEffect(() => {
    const fetchCity = async (city) => {
      const result = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey1}`
      ).then((response) => response.json());
      return result;
    };
    setCities(fetchCity(city));
    return () => {
      setCities([]);
    };
  }, [city]);

  /** 
   * useEffect to fetch and map to state object forecast of weather of current city
   * it runs whenever the current city state changes
   */
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const result = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey1}`
      ).then((response) => response.json());
      return result;
    };

    dispatchCityWeather({
      type: "map-forecast",
      forecast: fetchWeather(currentCity.lat, currentCity.lon),
    });

    return () => {
      dispatchCityWeather(null);
    };
  }, [cityWeather.currentCity]);

  return (
    <WeatherContext.Provider
      value={{ cities, setCity, city, cityWeather, dispatchCityWeather }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };

function mapCityWeather(state, action) {
  switch (action.type) {
    case "map-forecast": {
      return {
        ...state,
        weatherForecasted: action.forecast.list.map((forecast) => {
          return {
            date: {
              str: forecast.dt_txt,
              unix: forecast.dt,
            },
            temp: {
              current: forecast.main.temp,
              min: forecast.main.temp_min,
              max: forecast.main.temp_max,
              feelslike: forecast.main.feels_like,
            },
            pressure: forecast.main.pressure,
            humidity: forecast.main.humidity,
            visibility: forecast.visibility,
            precipitation: forecast.pop,
            cloud: {
              coverage: forecast.clouds.all,
            },
            wind: {
              speed: forecast.wind.speed,
              direction: forecast.wind.deg,
              gust: forecast.wind.gust,
            },
            weather: {
              main: forecast.weather[0].main,
              icon: forecast.weather[0].icon,
              description: forecast.weather[0].description,
            },
          };
        }),
      };
    }
    case "map-current-weather": {
      const currentWeather = action.currentWeather;
      return {
        ...state,
        currentWeather: {
          temp: {
            current: currentWeather.main["temp"],
            min: currentWeather.main.temp_min,
            max: currentWeather.main.temp_max,
            feelslike: currentWeather.main.feels_like,
          },
          humidity: currentWeather.main.humidity,
          pressure: currentWeather.main.pressure,
          visibility: currentWeather.visibility,
          weather: {
            main: currentWeather.weather[0].main,
            icon: currentWeather.weather[0].icon,
            description: currentWeather.weather[0].description,
          },
          cloud: {
            coverage: currentWeather.clouds.all,
          },
          wind: {
            speed: currentWeather.wind.speed,
            direction: currentWeather.wind.deg,
            gust: currentWeather.wind.gust,
          },
        },
      };
    }
    case "map-city": {
      return {
        ...state,
        currentCity: {
          name: action.city[0].name,
          lat: action.city[0].lat,
          lon: action.city[0].lon,
          state: action.city[0].state,
          country: action.city[0].country,
        },
      };
    }
  }
}
