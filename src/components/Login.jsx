import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import apiClient from "../services/Api.jsx";

function Login() {

  const {
    setIsLoggedIn
  } = useContext(WeatherContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function requestLogin() {
    if (isLoading) {
      console.log('csrf-cookie');
      await apiClient.get('/sanctum/csrf-cookie')
        .then(response => {
          console.log('/api/login');
          apiClient.post('/api/login', {
            email: email,
            password: password,
          })
            .then(response => {
              console.log('login response');
              if (response.status === 200) {
                setIsLoading(false);
                setIsLoggedIn(true);
                console.log('logged in');
                setEmail('');
                setPassword('');
              } else {
                setIsLoading(false);
                console.log('error logging in');
                setPassword('');
            }
            })
        });
    }
  }

  function handleInput(event) {
    event.preventDefault();
    console.log('handleInput');
    console.log(event);
    setEmail(event.target.form[0].value);
    setPassword(event.target.form[1].value);
    setIsLoading(true);
  }

  useEffect(() => {
    requestLogin();
  }, [isLoading]);

  return (
    <div>
      <input type="checkbox" id="modal-login" className="modal-toggle" hidden />
      <label for="modal-login" class="modal cursor-pointer">
        <label class="modal-box relative" htmlFor="">
          <h3 className="flex justify-center font-bold text-lg">login</h3>
          <form 
            action="#"
            className="grid items-center justify-center"
            onSubmit={requestLogin}
          >
            <input 
              type="text" 
              autoComplete="username"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleInput(event);
                } else if (event.key === 'Escape') {
                  return;   // TODO add cancel function
                }
              }}
              placeholder="email" 
              className="mt-4 input input-bordered w-full max-w-xs" 
            />
            <input 
              type="password" 
              autoComplete="current-password"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleInput(event);
                } else if (event.key === 'Escape') {
                  return;   // TODO add cancel function
                }
              }}
              placeholder="password" 
              className="mt-4 input input-bordered w-full max-w-xs" 
            />
            <button 
              className="grid justify-center btn btn-primary mt-3"
              onClick={event => {
                handleInput(event)
              }}
            >
              submit
            </button>
          </form>
        </label>
      </label>
    </div>
  )
}

export default Login
