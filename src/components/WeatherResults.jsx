import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import TempChart from "./charts/TempChart.jsx";
import PrecipChart from "./charts/PrecipChart.jsx";
import WindChart from "./charts/WindChart.jsx";
import WeatherForecastCards from "./WeatherForecastCards.jsx";
import CountUp from 'react-countup';
import api from "../services/Api.jsx";
import sprite from "../components/icons/sprite.svg";

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
  const [iconName, setIconName] = useState();
  const [tempChartVisible, setTempChartVisible] = useState(false);
  const [precipChartVisible, setPrecipChartVisible] = useState(false);
  const [windChartVisible, setWindChartVisible] = useState(false);

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
      setIconName(data.data.currentConditions.icon)
    } else {
      setIsSuccess(false);
    };
  };

  function handleTempButton() {
    setPrecipChartVisible(false);
    setWindChartVisible(false);
    setTempChartVisible(true);
  }

  function handlePrecipButton() {
    setTempChartVisible(false);
    setWindChartVisible(false);
    setPrecipChartVisible(true);
  }

  function handleWindButton() {
    setTempChartVisible(false);
    setPrecipChartVisible(false);
    setWindChartVisible(true);
  }

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
              <div className="grid grid-cols-4 grid-rows-1">
                <div className="col-span-1 flex justify-center items-center">
                  { iconName && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" stroke="#a6adba" fill="none" className="mt-2.5">
                      <use xlinkHref={`${sprite}#${iconName}`} />
                    </svg>
                  )}
                </div>
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
                <div className="col-span-2 text-xs mt-3 ml-6">
                  <div>{results.currentConditions.conditions}</div>
                  <div>Precipitation: {results.currentConditions.precip}%</div>
                  <div>Wind speed: {results.currentConditions.windspeed}mph</div>
                </div>
              </div>
              <div className="grid justify-center">
                <div className="mt-4">{results.resolvedAddress}</div>
                <div className="">As of: {results.currentConditions.datetime} ({results.timezone})</div>
                <div className="mt-4">{results.description}</div>
              </div>
            </div>
            <div className="inline-flex mt-4">
              <button 
                className={`btn btn-sm btn-warning mr-2 ${tempChartVisible ? "" : "btn-outline"}`}
                onClick={handleTempButton}
              >
                Temperature
              </button>
              <button 
                className={`btn btn-sm btn-info mr-2 ${precipChartVisible ? "" : "btn-outline"}`}
                onClick={handlePrecipButton}
              >
                Precipitation
              </button>
              <button 
                className={`btn btn-sm mr-2 ${windChartVisible ? "btn-outline bg-neutral-content text-black border-neutral-content" : "btn-outline"}`}
                onClick={handleWindButton}
              >
                Wind
              </button>
            </div>
            { tempChartVisible && !preFetch && (
              <TempChart />
            )}
            { precipChartVisible && !preFetch && (
              <PrecipChart />
            )}
            { windChartVisible && !preFetch && (
              <WindChart />
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
