import { useState, useEffect } from 'react';
import './App.css'
import { WeatherContext } from "./context/WeatherContext.js";
import Searchbox from "./components/Searchbox.jsx";
import WeatherResults from "./components/WeatherResults.jsx";
import Navbar from "./components/Navbar.jsx";
import { ProvideAuth } from "./hooks/useAuth.jsx";

function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [weatherVisible, setWeatherVisible] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [preFetch, setPreFetch] = useState(true);
  const apiRoutes = {
    'today': '/api/weather/today/',
    'forecast': '/api/weather/forecast/',
  };
  const [futureHours, setfutureHours] = useState(null);

  function stripFutureHourObjects() {
    if (!results) {
      return;
    };
    setfutureHours(results.futureHours);
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
      preFetch,
      setPreFetch,
    }}>
      <ProvideAuth>
        <div>
          <Navbar />
          <div>
            <Searchbox />
            <div className="grid place-items-center mt-4" />
          </div>
          {weatherVisible && <WeatherResults />}
        </div>
      </ProvideAuth>
    </WeatherContext.Provider>
  )
}

export default App
