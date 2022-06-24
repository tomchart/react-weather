import { useState, useEffect } from 'react';
import './App.css'
import { WeatherContext } from "./context/WeatherContext.js";
import Searchbox from "./components/Searchbox.jsx";
import WeatherResults from "./components/WeatherResults.jsx";
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';

function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [weatherVisible, setWeatherVisible] = useState(false);
  const [results, setResults] = useState(null);
  const apiUri = 'http://127.0.0.1:8000/api';
  const apiRoutes = {
    'today': apiUri + '/weather/today/',
    'forecast': apiUri + '/weather/forecast/',
  };
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [futureHours, setfutureHours] = useState([]);
  const [futureHourDatetimes, setfutureHourDatetimes] = useState([]);
  const [futureHourTemps, setfutureHourTemps] = useState([]);

  function formatCurrentDateTime() {
    if (!results) {
      return;
    };
    var current = new Date(results.days[0].datetime + ' ' + results.currentConditions.datetime).toISOString();
    setCurrentDateTime(current);
  }

  function filterFutureHours(dayObject, current=currentDateTime) {
    var dayObjectDate = new Date(dayObject.datetime);
    var dayDifference = differenceInDays(parseISO(current), dayObjectDate);
    var futureHours = [];
    if (dayDifference <= 1 && dayDifference >= 0) {
      dayObject.hours.map(hourObject => {
        var hourObjectDatetime = new Date(dayObject.datetime + ' ' + hourObject.datetime);
        var hourDifference = differenceInHours(parseISO(current), hourObjectDatetime);
        
        // if less than a day in the future and hour like HH % 3 = 0 then store for display to user
        if (hourDifference <= 1 && hourDifference >= -24 && hourObject.datetime.substring(0, 2) % 3 === 0) {
          futureHours.push(hourObject);
        };
      });
    };
    return futureHours;
  }

  function stripFutureHourObjects() {
    if (!results && !currentDateTime) {
      return;
    }; 
    var futureHourObjectArrays = [];
    results.days.map(day => {
      // pass all dayObjects received to filterFutureHours
      futureHourObjectArrays.push(filterFutureHours(day));
    });
    // flatten array of objects returned by filterFutureHours
    var futureHourObjects = [].concat(...futureHourObjectArrays);
    setfutureHours(futureHourObjects);
  }

  function stripFutureHourDatetimes() {
    if (!futureHours) {
      return;
    };
    var hourDatetimes = [];
    futureHours.map(hour => {
      hourDatetimes.push(hour.datetime.substring(0, hour.datetime.length - 3));
    })
    setfutureHourDatetimes(hourDatetimes);
  }

  function stripFutureHourTemps() {
    if (!futureHours) {
      return;
    };
    var hourTemps = [];
    futureHours.map(hour => {
      hourTemps.push(hour.temp);
    })
    setfutureHourTemps(hourTemps);
  }
  

  useEffect(() => {
    formatCurrentDateTime();
  }, [results]);

  useEffect(() => {
    stripFutureHourObjects();
  }, [currentDateTime])

  useEffect(() => {
    stripFutureHourDatetimes();
    stripFutureHourTemps();
  }, [futureHours]);

  return (
    <WeatherContext.Provider value={{
      searchInput,
      setSearchInput,
      searchType,
      setSearchType,
      weatherVisible,
      setWeatherVisible,
      apiRoutes,
      results,
      setResults,
      currentDateTime,
      futureHours,
      futureHourDatetimes,
      futureHourTemps,
    }}>
      <div>
        <div className="mt-8">
          <Searchbox />
        </div>
        {weatherVisible && <WeatherResults />}
      </div>
    </WeatherContext.Provider>
  )
}

export default App
