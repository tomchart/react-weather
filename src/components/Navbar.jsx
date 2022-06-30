import Login from "./Login.jsx";

function Navbar() {
  return (
    <div>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">weather</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li><label htmlFor="modal-login">login</label></li>
            <li><a>register</a></li>
          </ul>
        </div>
      </div>
      <Login />
    </div>
  )
}

export default Navbar
