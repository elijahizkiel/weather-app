import { useContext, useState } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchInput({ className }) {
  const [searched, setSearched] = useState(false);
  const { cities, setCity, setCurrentCity } = useContext(WeatherContext);
  const [searchedCity, setSearchedCity] = useState("");
  return (
    <div className={className}>
      <div className="flex  align-middle justify-center w-full relative">
        <input
          type="text"
          id="city"
          name="city"
          className="text-white mx-3 rounded-2xl p-3 outline-0 w-full bg-[#212A3B] "
          value={searchedCity}
          onInput={(e) => {
            setSearchedCity(e.target.value);
          }}
          placeholder="Search for cities"
        />
        <button
          onClick={() => {
            setSearched(true);
            setCity(searchedCity);
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="cursor-pointer text-amber-50"
          />
        </button>
        {searched && cities && (
          <ShowSearchResultList
            className="text-white rounded-xl border-2 border-[#394865] absolute top-12 left-5 w-svh h-fit bg-[#212A3B] shadow-md"
            collection={cities}
            onClickOnItem={(city)=>{
              setCurrentCity(city);
              setSearched(false);
              setSearchedCity("");
            }}
          />
        )}
      </div>
    </div>
  );
}

function ShowSearchResultList({ className, collection = [], onClickOnItem }) {
  return (
    <ul className={className}>
      {collection?.map((city, index) => {
        return (
          <li
          className="hover:bg-[#394865]"
            key={`${city?.lat}${city?.lon}`}
            onClick={() => {
              onClickOnItem(index);
            }}
          >
            <div className="flex justify-items-start items-center cursor-pointer">
              <h3 className="text-xl font-extrabold font-serif p-2">
                {city.name}
              </h3>
              <p className="font-bold p-2">{city.state}</p>
              <p className="p-2">{city.country}</p>
            </div>
          </li>
        );
      })}
      {!collection && <p>Loading</p>}
    </ul>
  );
}
