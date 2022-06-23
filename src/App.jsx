import { useState } from 'react';
import './App.css'
import { WeatherContext } from "./context/WeatherContext.js";
import Searchbox from "./components/Searchbox.jsx";
import WeatherResults from "./components/WeatherResults.jsx";

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
