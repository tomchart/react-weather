import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";

function Navbar() {

  const auth = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  function handleLogout() {
    auth.logout();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" onClick={refreshPage}>weather</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            { auth.user && (
              <div className="flex inline-row">
                <li className="mt-3 mr-4 font-light">Hi, {auth.user.name}!</li>
                <li><a onClick={handleLogout}>logout</a></li>
              </div>
            )}
            { !auth.user && (
              <>
                <li><button onClick={() => setModalOpen(true)}>login</button></li>
                <li><label htmlFor="modal-register">register</label></li>
              </>
            )}
          </ul>
        </div>
      </div>
      { modalOpen && (
        <Login setModalOpen={setModalOpen} />
      )}
      <Register />
    </div>
  )
}

export default Navbar
