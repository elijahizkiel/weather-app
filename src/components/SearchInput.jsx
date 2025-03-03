import { useState, useEffect } from "react";
import { apiKey } from "../../api_key";
export default function SearchInput() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCity = async (city) => {
      const result = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`
      ).then((response) => response.json());
    return result;
    };
    setCities(fetchCity(city))
    return ()=>{setCities([])};
  },[city]);

  return (
    <div className="">
      <input
        type="text"
        value={city}
        onInput={(e) => {
          setCity(e.target.value);
        }}
        placeholder="Search for cities"
      />
      <button className="material-symbols-outlined" >search</button>
        {cities && <ShowSearchResultList collection={cities} />}
    </div>
  );
}

function ShowSearchResultList({collection, onClickOnItem}){
    return(
        <ul className="search-results">
            {collection.map((item)=>{
                return (
                    <li onClick={()=>{onClickOnItem(item.name)}}>
                    <div className="result-item" >
                        <h3 className="city-name">{item.name}</h3>
                        <p className="state-name">{item.state}</p>
                        <p className="country-name">{item.country}</p>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}