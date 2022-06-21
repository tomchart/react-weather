import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext.js";

function Searchbox() {
  const {
    searchInput,
    setSearchInput,
    weatherVisible,
    setWeatherVisible
  } = useContext(WeatherContext);

  function handleInput(event) {
    setSearchInput(event.target.value);
  }

  function makeSearch(event) {
    event.preventDefault();
    if (searchInput.trim().length === 0) {
      return
    }
    setWeatherVisible(prevWeatherVisible => !weatherVisible);
  }

  return (
    <>
      <form 
        action="#"
        className="flex items-center justify-center"
        onSubmit={makeSearch}
      >
        <input 
          type="text" 
          defaultValue={searchInput}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleInput(event);
            } else if (event.key === 'Escape') {
              return;   // TODO add cancel function
            }
          }}
          placeholder="Enter postcode/town/city" 
          className="mt-4 input input-bordered w-full max-w-xs" 
        />
      </form>
    </>
  )
}

export default Searchbox
