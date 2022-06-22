import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext.js";

function WeatherForecast () {
  const { 
    results,
  } = useContext(WeatherContext);

  const [hours, setHours] = useState(null);

  function stripHours() {
    var allHours = [];
    results.days.map(days => {
      days.hours.map(hour => {
        allHours.push(hour);
      })
    })
    return allHours;
  };

  useEffect(() => {
    setHours(stripHours());
  }, []);

  // bug here when rendering locations with no future hours - breaks formatting when re-rendering a location that does have them
  return (
    <>
      { hours && (
        <div className="flex inline-row">
          {[...hours].filter(hour => hour.datetime > results.currentConditions.datetime).map((hour, index) => 
            <div key={index} className="mr-8 mt-6">
              <div className="flex">{hour.temp}°C</div>
              <div className="flex">{hour.datetime.substring(0, hour.datetime.length - 3)}</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default WeatherForecast
