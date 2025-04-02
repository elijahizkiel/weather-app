export default function WeatherCard({ time, temp, weather, isVertical }) {
  /**
   * @param time gives string format of time either name of day or time in the day
   * @param temp highest and lowest temperature at current time
   * @param weather main weather by current time or day
   */
  return (
    <div
      className={`flex justify-around items-center gap-1 text-lg  ${
        !isVertical ? "flex-col" : "flex-row"
      } text-gray-400 `}
    >
      <p className="text-grey-600 text-center p-1.5">{time}</p>
      <div className="">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="max-h-15"
        />
        {isVertical && <p className="text-red-500 text-xl">{weather.main}</p>}
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
