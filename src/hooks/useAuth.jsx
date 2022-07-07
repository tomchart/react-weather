import React, { useState, useEffect, useContext, createContext } from "react";
import api from "../services/Api.jsx";
import useUserData from "./useUser.jsx";

const authContext = createContext();

// Provider component that wraps app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const user = useUserData();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  function loginCleanup(response) {
    localStorage.setItem(('user'), JSON.stringify(response.data));
    window.dispatchEvent(new Event('storage')) 
    setLoggedIn(() => true);
    if (response.data.location) {
      setLocation(() => response.data.location);
    }
    return response.data;
  };

  function logoutCleanup() {
    localStorage.setItem('user', null);
    window.dispatchEvent(new Event('storage')) 
    setLoggedIn(() => false);
    setLocation(() => null);
  };

  const login = (email, password) => {
    return api.post('/api/login', {
      email: email,
      password: password
      }) 
      .then((response) => {
        let data = loginCleanup(response);
        return data;
      })
      .catch((response) => {
        localStorage.setItem('user', null);
        window.dispatchEvent(new Event('storage')) 
        setError(true);
        return response.data;
      });
  };

  const register = (name, email, password) => {
    return api.post('/api/register', {
      name: name,
      email: email,
      password: password
    })
      .then((response) => {
        let data = loginCleanup(response);
        return data;
      })
      .catch((response) => {
        localStorage.setItem('user', null);
        window.dispatchEvent(new Event('storage')) 
        setError(true);
        return response.data;
      });
  };

  const logout = () => {
    return api.post('/api/logout')
      .then(() => {
        logoutCleanup();
      })
      .catch((response) => {
        setError(true);
        return response.data;
      });
  };

  const storeLocation = (location) => {
    return api.post('/api/location/store', {
      location: location,
    })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.dispatchEvent(new Event('storage'));
        setLocation(response.data.location);
        setLocationSuccess(true);
      })
      .catch((response) => {
        setLocationError(true);
        return response.data;
      });
  }

  function setStateFromSession() {
    if (user) {
      setLoggedIn(true);
      if (user.location) {
        setLocation(user.location);
      }
    }
  }

  useEffect(() => {
      setStateFromSession();
  }, [user])

  // Return the user object and auth methods
  return {
    user,
    error,
    login,
    register,
    logout,
    storeLocation,
    loggedIn,
    location,
    locationError,
    setLocationError,
    locationSuccess,
    setLocationSuccess
  };
}
