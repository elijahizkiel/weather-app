export default function WeatherCard({ time, temp, weather }) {
  /**
   * @param time gives string format of time either name of day or time in the day
   * @param temp highest and lowest temperature at current time
   * @param weather main weather by current time or day
   */
  return (
    <div className="weather-card">
      <p className="time">{time}</p>
      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.descr}
        />
      </div>
      <p>{temp.high && temp.low ? `${temp.high}/${temp.low}` : temp.high}</p>
    </div>
  );
}
