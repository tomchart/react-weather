import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import WeatherChart from "./WeatherChart.jsx";
import WeatherForecastCards from "./WeatherForecastCards.jsx";
import CountUp from 'react-countup';
import api from "../services/Api.jsx";

function WeatherResults() {
  const [preFetch, setPreFetch] = useState(true);
  const { 
    searchInput,
    searchType,
    apiRoutes,
    setResults,
    results,
  } = useContext(WeatherContext);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  function fetch(){
    setIsLoading(true);
    api.get(apiRoutes[searchType] + searchInput)
      .then(response => {
        setData(response);
      })
  }

  function setDataFetchState() {
    setPreFetch(false);
    setIsLoading(false);
    if (data.status === 200 && typeof data.data == "object") {
      setIsSuccess(true);
      setResults(data.data);
    } else {
      setIsSuccess(false);
    };
  };

  useEffect(() => {
    if (preFetch) {
      console.log('fetching');
      fetch();
    }
  }, [])

  useEffect(() => {
    if (preFetch && data) {
      setDataFetchState();
    }
  }, [data]);

  return (
    <div>
      <div className="grid place-items-center mt-2 mb-2">
        { preFetch && (
          <>
            <h3 className="mt-4">Fetching...</h3>
            <progress className="progress w-56 mt-2"></progress>
          </>
        )}
        { isLoading && !preFetch && (
          <>
            <h3 className="mt-4">Loading...</h3>
            <progress className="progress w-56 mt-2"></progress>
          </>
        )}
        { isError && !preFetch && (
          <div>{error.message}</div>
        )}
        { isSuccess && !preFetch && (
          <>
            <div className="grid">
              <div className="grid grid-cols-3 grid-rows-1">
                <div className="col-span-1 justify-left">
                  <CountUp 
                    end={results.currentConditions.temp} 
                    decimals={1}
                    decimal="."
                    duration={0.4}
                    suffix="°C"
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div className="text-3xl mt-2" ref={countUpRef}></div>
                    )}
                  </CountUp>
                  <div className="text-xs">Feels like: {results.currentConditions.feelslike}°C</div>
                </div>
                <div className="col-span-2 text-xs mt-3 ml-2">
                  <div>{results.currentConditions.conditions}</div>
                  <div>Precipitation: {results.currentConditions.precip}%</div>
                  <div>Wind speed: {results.currentConditions.windspeed}mph</div>
                </div>
              </div>
              <div className="mt-4">{results.resolvedAddress}</div>
              <div className="">{results.currentConditions.datetime} ({results.timezone})</div>
              <div className="mt-4">{results.description}</div>
            </div>
            { isSuccess && !preFetch && (
              <WeatherChart />
            )}
            { isSuccess && !preFetch && searchType === 'forecast' && (
              <WeatherForecastCards />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default WeatherResults
