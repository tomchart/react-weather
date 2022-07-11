import { useState, useEffect } from 'react';
import './App.css'
import { WeatherContext } from "./context/WeatherContext.js";
import Searchbox from "./components/Searchbox.jsx";
import WeatherResults from "./components/WeatherResults.jsx";
import Navbar from "./components/Navbar.jsx";
import { ProvideAuth } from "./hooks/useAuth.jsx";
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';

function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [weatherVisible, setWeatherVisible] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiRoutes = {
    'today': '/api/weather/today/',
    'forecast': '/api/weather/forecast/',
  };
  const [futureHours, setfutureHours] = useState(null);

  function filterFutureHours(datesWithHours) {
    var futureHours = [];
    var initialHour = new Date;
    var current = new Date(results.days[0].datetime + ' ' + results.currentConditions.datetime).toISOString();
    datesWithHours.map(dateWithHour => {
      let datetime = parseISO(dateWithHour.date + ' ' + dateWithHour.hourObject.datetime);
      let dayDifference = differenceInDays(parseISO(current), datetime);
      if (dayDifference >= -1 && dayDifference <= 0) {
        let hourDifference = differenceInHours(parseISO(current), datetime);
        if (hourDifference <= 0 && hourDifference >= -23) {
          dateWithHour.hourObject.date = dateWithHour.date
          dateWithHour.hourObject.time = dateWithHour.hourObject.datetime
          dateWithHour.hourObject.datetime = dateWithHour.hourObject.date + " " + dateWithHour.hourObject.time
          if (futureHours.length === 0) {
            futureHours.push(dateWithHour.hourObject);
            initialHour.setDate(datetime.getDate());
            initialHour.setTime(datetime.getTime());
          } else {
            let hourDiffToInitial = differenceInHours(initialHour, datetime);
            if (hourDiffToInitial % 3 === 0) {
              futureHours.push(dateWithHour.hourObject);
            }
          }
        }
      };
    })
    let futureHourObject = {};
    futureHours.map((futureHour, index) => {
      futureHourObject[index] = futureHour;
    })
    return futureHourObject;
  }

  function stripFutureHourObjects() {
    if (!results) {
      return;
    }; 

    // pass all dayObjects received to filterFutureHours
    let datesWithHours = [];
    results.days.map(day => {
      // this key is called datetime but is actually just a date
      let date = day.datetime;
      day.hours.map(hour => {
        let datetimeObject = {
          ['date']: date,
          ['hourObject']: hour
        };
        datesWithHours.push(datetimeObject);
      })
    });
    let futureHourObject = filterFutureHours(datesWithHours);
    setfutureHours(futureHourObject);
  }

  useEffect(() => {
    stripFutureHourObjects();
  }, [results])

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
      futureHours,
      isLoggedIn,
      setIsLoggedIn,
    }}>
      <ProvideAuth>
        <div>
          <Navbar />
          <div className="mt-4">
            <Searchbox />
            <div className="grid place-items-center mt-4">
            </div>
          </div>
          {weatherVisible && <WeatherResults />}
        </div>
      </ProvideAuth>
    </WeatherContext.Provider>
  )
}

export default App
