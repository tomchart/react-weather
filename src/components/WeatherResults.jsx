import { useContext } from "react";
import { useQuery } from "react-query";
import { WeatherContext } from "../context/WeatherContext.js";

function WeatherResults() {
  const { searchInput } = useContext(WeatherContext);
  const {
    data: results,
    isLoading,
    isError,
    error,
    isSuccess
  } = useQuery(searchInput, fetchWeather);
  // console.log(results);

  function fetchWeather() {
    console.log("http://127.0.0.1:8000/api/weather/" + searchInput)
    return fetch("http://127.0.0.1:8000/api/weather/" + searchInput).then(response => response.json());
  }

  return (
    <div>
      <div className="grid place-items-center mt-2 mb-2">
        { isLoading && (
          <>
            <h3 className="mt-4">Loading...</h3>
            <progress className="progress w-56 mt-2"></progress>
          </>
        )}
        { isError && (
          <div>{error.message}</div>
        )}
        { isSuccess && (
          <>
            <div className="mt-4">{results.resolvedAddress}</div>
            <div className="">{results.currentConditions.datetime} ({results.timezone})</div>
            <div className="text-lg">{results.currentConditions.temp}</div>
            <div className="mt-4">{results.description}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherResults
