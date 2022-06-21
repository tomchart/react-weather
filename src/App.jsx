import { useState } from 'react';
import './App.css'
import { WeatherContext } from "./context/WeatherContext.js";
import Searchbox from "./components/Searchbox.jsx";
import WeatherResults from "./components/WeatherResults.jsx";

function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [weatherVisible, setWeatherVisible] = useState(false);

  return (
    <WeatherContext.Provider value={{
      searchInput,
      setSearchInput,
      weatherVisible,
      setWeatherVisible,
    }}>
      <div>
        <Searchbox />
      </div>
      {weatherVisible && <WeatherResults />}
    </WeatherContext.Provider>
  )
}

export default App
