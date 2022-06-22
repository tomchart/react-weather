import React, { useContext, useEffect, useRef } from "react";
import { WeatherContext } from "../context/WeatherContext.js";

function Searchbox() {
  const {
    searchInput,
    setSearchInput,
    setSearchType,
    weatherVisible,
    setWeatherVisible
  } = useContext(WeatherContext);
  const searchInputEl = useRef(null);

  function handleInput(event) {
    if (event.target.value) {
      setSearchInput(event.target.value.replace(/\s+/g, ''));
    } else if (event.target.form[0].value) {
      setSearchInput(event.target.form[0].value.replace(/\s+/g, ''));
    } else {
      return;
    }
  }

  function makeSearch(event) {
    event.preventDefault();
    if (searchInput.trim().length === 0) {
      return
    }
    if (!weatherVisible) {
      setWeatherVisible(prevWeatherVisible => !weatherVisible);
    }
  }

  useEffect(() => {
    searchInputEl.current.focus();
  }, []);

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
          ref={searchInputEl}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleInput(event);
              setSearchType('today');
            } else if (event.key === 'Escape') {
              return;   // TODO add cancel function
            }
          }}
          placeholder="Enter postcode/town/city" 
          className="mt-4 input input-bordered w-full max-w-xs" 
        />
        <button 
          className="btn btn-primary ml-4 mt-3"
          onClick={event => {
            handleInput(event)
            setSearchType('today')
          }}
        >
          today
        </button>
        <button 
          className="btn btn-primary ml-2 mt-3"
          onClick={event => {
            handleInput(event)
            setSearchType('forecast')
          }}
        >
          forecast
        </button>
      </form>
    </>
  )
}

export default Searchbox
