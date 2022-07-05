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
        <div className="grid place-items-center w-1/4">
          <div className="relative w-full">
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
              className="mt-3.5 input input-bordered w-full" 
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                id="save-button"
                name="save-button"
                className="p-2 pt-5 pr-3"
              >
                <svg 
                  width="24px" 
                  height="24px" 
                  viewBox="0 0 24 24" 
                  role="img" 
                  xmlns="http://www.w3.org/2000/svg" 
                  aria-labelledby="saveIconTitle" 
                  stroke="#a6adba" 
                  stroke-width="1" 
                  stroke-linecap="square" 
                  stroke-linejoin="miter" 
                  fill="none" 
                  color="#000000"
                >
                  <title id="saveIconTitle">Save</title> 
                  <path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z"/>
                  <rect width="10" height="8" x="7" y="13"/>
                  <rect width="8" height="5" x="8" y="3"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
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
