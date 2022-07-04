import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import ReactDOM from "react-dom";

function Login(props) {

  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function closeModal() {
    props.setLoginOpen(false);
  }

  function requestLogin() {
    console.log('requestLogin')
    if (isLoading) {
      console.log('auth.login')
      auth.login(email, password);
      setIsLoading(false);
      setEmail('');
      setPassword('');
      }
  }

  function handleLogin() {
    if (auth.user) {
      closeModal();
    };
  }

  function handleInput(event) {
    event.preventDefault();
    console.log('handleInput');
    setIsLoading(true);
    setEmail(event.target.form[0].value);
    setPassword(event.target.form[1].value);
  }

  useEffect(() => {
    requestLogin();
  }, [isLoading]);

  useEffect(() => {
    handleLogin();
  }, [auth.user])

  return ReactDOM.createPortal(
    <>
      <div 
        className="fixed h-full w-full bg-gray-800 opacity-70 top-0"
        onClick={closeModal}
      />
        <div className="grid place-items-center">
          <div className="fixed modal-box w-2xl max-w-2xl top-20">
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
                    closeModal();
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
                    closeModal();
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
              { isLoading && (
                <progress className="progress flex mt-4"></progress>
              )}
            </form>
          </div>
        </div>
    </>,
    document.getElementById("login-modal"),
  );
}

export default Login
