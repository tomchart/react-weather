import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

function Login() {

  // logs out on refresh
  // hmmm

  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function requestLogin() {
    if (isLoading) {
      auth.login(email, password);
      setIsLoading(false);
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
      <label htmlFor="modal-login" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
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
            { auth.error && (
              <div className="grid place-items-center text-xs mt-2">
                <p>Authentication error</p>
              </div>
            )}
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
