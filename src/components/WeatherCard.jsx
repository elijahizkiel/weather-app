export default function WeatherCard({ time, temp, weather, isVertical }) {
  /**
   * @param time gives string format of time either name of day or time in the day
   * @param temp highest and lowest temperature at current time
   * @param weather main weather by current time or day
   */
  return (
    <div
      className={`flex justify-around h-fit items-center gap-1 text-lg border-[#394865] ${
        !isVertical ? "flex-col border-r-2 " : "grid grid-cols-3 grid-row-1 border-b-2"
      } text-gray-400 `}
    >
      <p className="text-grey-600 text-center p-1">{time}</p>
      <div className="">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="max-h-15"
        />
        {isVertical && <p className="text-lg">{weather.main}</p>}
      </div>
      <p className="text-center ">
        {isVertical
          ? `${(temp.max - 273).toPrecision(2)}/${(temp.min - 273).toPrecision(
              2
            )}`
          : (temp.current - 273).toPrecision(2)}
        &deg;
      </p>
    </div>
  );
}
