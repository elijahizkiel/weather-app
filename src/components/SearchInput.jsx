import { useContext } from "react";
import { WeatherContext } from "../contexts/weatherContext";
export default function SearchInput() {
  const {cities, city, setCity  } = useContext(WeatherContext);
  return (
    <div className="serach-bar">
      <input
        type="text"
        value={city}
        onInput={(e) => {
          setCity(e.target.value);
        }}
        placeholder="Search for cities"
      />
      <button className="material-symbols-outlined" >search</button>
        {cities && <ShowSearchResultList collection={cities} onClickOnItem={setCurrentCity}/>}
    </div>
  );
}

function ShowSearchResultList({collection, onClickOnItem}){
    return(
        <ul className="search-results">
            {collection.map((item)=>{
                return (
                    <li onClick={()=>{onClickOnItem(item)}}>
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