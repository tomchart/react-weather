import React, { useState, useEffect, useContext, createContext } from "react";
import api from "../services/Api.jsx";

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
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Wrap any API methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email, password) => {
    console.log('login hook')
    return api.post('/api/login', {
      email: email,
      password: password
      }) 
      .then((response) => {
        setUser(response.data);
        setError(false);
        return response.data;
      })
      .catch((response) => {
        setUser(false);
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
        setUser(response.data);
        setError(false);
        return response.data;
      })
      .catch((response) => {
        setUser(false);
        setError(true);
        return response.data;
      });
  };
  const logout = () => {
    return api.post('/api/logout')
      .then(() => {
        setUser(false);
      });
  };

  // Return the user object and auth methods
  return {
    user,
    error,
    login,
    register,
    logout,
  };
}
