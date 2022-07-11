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
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [futureHours, setfutureHours] = useState([]);
  const [futureHourDatetimes, setfutureHourDatetimes] = useState([]);
  const [futureHourTemps, setfutureHourTemps] = useState([]);
  const [futureHourPrecip, setfutureHourPrecip] = useState([]);
  const [futureHourWind, setfutureHourWind] = useState([]);

  function formatCurrentDateTime() {
    if (!results) {
      return;
    };
    var current = new Date(results.days[0].datetime + ' ' + results.currentConditions.datetime).toISOString();
    setCurrentDateTime(current);
  }

  function filterFutureHours(datesWithHours, current=currentDateTime) {
    var futureHours = [];
    var initialHour = new Date;
    datesWithHours.map(dateWithHour => {
      let datetime = parseISO(dateWithHour.date + ' ' + dateWithHour.hourObject.datetime);
      let dayDifference = differenceInDays(parseISO(current), datetime);
      if (dayDifference >= -1 && dayDifference <= 0) {
        let hourDifference = differenceInHours(parseISO(current), datetime);
        if (hourDifference <= 0 && hourDifference >= -23) {
          if (futureHours.length === 0) {
            futureHours.push(dateWithHour);
            initialHour.setDate(datetime.getDate());
            initialHour.setTime(datetime.getTime());
          } else {
            let hourDiffToInitial = differenceInHours(initialHour, datetime);
            if (hourDiffToInitial % 3 === 0) {
              futureHours.push(dateWithHour);
            }
          }
        }
      };
    })
    return futureHours;
  }

  function stripFutureHourObjects() {
    if (!results && !currentDateTime) {
      return;
    }; 
    var futureHourObjectArray = [];

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
    futureHourObjectArray.push(filterFutureHours(datesWithHours));

    // flatten array of objects returned by filterFutureHours
    var futureHourObjects = [].concat(...futureHourObjectArray);
    setfutureHours(futureHourObjects);
  }

  function stripFutureHourDatetimes() {
    if (!futureHours) {
      return;
    };
    var hourDatetimes = [];
    futureHours.map(futureHour => {
      let hour = futureHour.hourObject;
      hourDatetimes.push(hour.datetime.substring(0, hour.datetime.length - 3));
    })
    setfutureHourDatetimes(hourDatetimes);
  }

  function stripFutureHourTemps() {
    if (!futureHours) {
      return;
    };
    var hourTemps = [];
    futureHours.map(futureHour => {
      let hour = futureHour.hourObject;
      hourTemps.push(hour.temp);
    })
    setfutureHourTemps(hourTemps);
  }

  function stripFutureHourPrecip() {
    if (!futureHours) {
      return;
    };
    var hourPrecip = [];
    futureHours.map(futureHour => {
      let hour = futureHour.hourObject;
      hourPrecip.push(hour.precip);
    })
    setfutureHourPrecip(hourPrecip);
  }

  function stripFutureHourWind() {
    if (!futureHours) {
      return;
    };
    var hourWind = [];
    futureHours.map((futureHour, index) => {
      let hour = futureHour.hourObject;
      hour.date = futureHours[index].date + " " + hour.datetime;
      // hourWind.push({windspeed: hour.windspeed, winddir: hour.winddir});
      hourWind.push(hour);
    })
    setfutureHourWind(hourWind);
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
    stripFutureHourPrecip();
    stripFutureHourWind();
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
      futureHourPrecip,
      futureHourWind,
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
