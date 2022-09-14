import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import sprite from "../components/icons/sprite.svg";

function WeatherForecastCards () {

  const { 
    results,
  } = useContext(WeatherContext);

  const reversed = [...results.days].reverse();
  reversed.pop();
  const futureDays = reversed.reverse();
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div className="inline-flex">
      { futureDays.map((dayObject, index) =>
        <div key={index} className="p-2 bg bg-slate-700 rounded-xl ml-2 mr-2 grid place-items-center">
          <p>{weekday[new Date(dayObject.date).getDay()]}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" stroke="#a6adba" fill="none">
            <use xlinkHref={`${sprite}#${dayObject.iconName}`} />
          </svg>
          <div className="w-16 grid place-items-center">
            <div className="inline-flex">
              <p className="font-semibold mr-1">{dayObject.tempMax}</p>
              <p className="font-light">{dayObject.tempMin}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherForecastCards
