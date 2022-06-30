import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { WeatherContext } from "../context/WeatherContext.js";
import api from "../services/Api.jsx";
import { useEffect, useContext, useState } from "react";

function Navbar() {

  const {
    isLoggedIn
  } = useContext(WeatherContext);
  
  const [userDetails, setUserDetails] = useState(null);

  function details(response) {
    setUserDetails(response.data);
  }

  function getUserDetails() {
    if (isLoggedIn) {
      console.log('fetching user details');
      api.get('/api/user')
        .then(response => {
          details(response)
        })
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [isLoggedIn])

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">weather</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            { userDetails && (
              <>
                <li><a>hi, {userDetails.name}</a></li>
              </>
            )}
            { !isLoggedIn && (
              <>
                <li><label htmlFor="modal-login">login</label></li>
                <li><label htmlFor="modal-register">register</label></li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Login />
      <Register />
    </div>
  )
}

export default Navbar
