export default function WeatherCard({ time, temp, weather, isVertical }) {
  /**
   * @param time gives string format of time either name of day or time in the day
   * @param temp highest and lowest temperature at current time
   * @param weather main weather by current time or day
   */
  return (
    <div className={"flex justify-between" + isVertical?"flex-col":"flex-row"}>
      <p className="text-grey-600 p-1.5">{time}</p>
      <div className="">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.descr}
        />
        {isVertical && <p>{weather.main}</p>}
      </div>
      <p>{temp.high && temp.low ? `${temp.high}/${temp.low}` : temp.high}</p>
    </div>
  );
}
