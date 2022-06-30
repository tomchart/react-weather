import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
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

  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,
  //   isSuccess
  // } = useQuery(searchInput + '_' + searchType, api.get(apiRoutes[searchType] + searchInput));

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  function fetch(){
    setIsLoading(true);
    let promise = api.get(apiRoutes[searchType] + searchInput)
    promise.then(response => {
      console.log('response: ')
      console.log(response)
      setData(response);
    })
  }

  // function fetchWeather() {
  //   console.log(apiRoutes[searchType] + searchInput)
  //   return api.get(apiRoutes[searchType] + searchInput);
  // }

  function setDataFetchState() {
    setPreFetch(false);
    setIsLoading(false);
    setResults(data.data);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (preFetch) {
      console.log('fetching');
      fetch();
    }
  }, [])

  useEffect(() => {
    console.log('data changed: ' + data);
    if (preFetch && data) {
      console.log('success, set fetch state')
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
