import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import ReactDOM from "react-dom";

function Register(props) {

  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function closeModal() {
    props.setRegisterOpen(false);
  }

  function requestRegister() {
    if (isLoading) {
      auth.register(name, email, password);
      setName('');
      setEmail('');
      setPassword('');
    }
  }

  function handleInput(event) {
    event.preventDefault();
    console.log('handleInput');
    console.log(event);
    setName(event.target.form[0].value);
    setEmail(event.target.form[1].value);
    setPassword(event.target.form[2].value);
    setIsLoading(true);
  }

  function handleRegister() {
    if (auth.user) {
      closeModal();
    };
  }

  useEffect(() => {
    requestRegister();
  }, [isLoading]);

  useEffect(() => {
    handleRegister();
  }, [auth.user])

  return ReactDOM.createPortal(
    <>
      <div 
        className="fixed h-full w-full bg-gray-800 opacity-70 top-0"
        onClick={closeModal}
      />
        <div className="grid place-items-center">
          <div className="fixed modal-box w-2xl max-w-2xl top-20">
            <h3 className="flex justify-center font-bold text-lg">register</h3>
            <form 
              action="#"
              className="grid items-center justify-center"
              onSubmit={requestRegister}
            >
              <input 
                type="text" 
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    handleInput(event);
                  } else if (event.key === 'Escape') {
                    closeModal();
                  }
                }}
                placeholder="name" 
                className="mt-4 input input-bordered w-full max-w-xs" 
              />
              <input 
                type="text" 
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
                  <p>Registration error</p>
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
    document.getElementById("register-modal"),
  );
}

export default Register
