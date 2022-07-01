import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

function Register() {

  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function requestRegister() {
    if (isLoading) {
      auth.register(name, email, password);
      setIsLoading(false);
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

  useEffect(() => {
    requestRegister();
  }, [isLoading]);

  return (
    <div>
      <input type="checkbox" id="modal-register" className="modal-toggle" hidden />
      <label htmlFor="modal-register" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="flex justify-center font-bold text-lg">register</h3>
          <form 
            action="#"
            className="grid items-center justify-center"
            onSubmit={requestRegister}
          >
            <input 
              type="text" 
              autoComplete="name"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleInput(event);
                } else if (event.key === 'Escape') {
                  return;   // TODO add cancel function
                }
              }}
              placeholder="name" 
              className="mt-4 input input-bordered w-full max-w-xs" 
            />
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
          </form>
        </label>
      </label>
    </div>
  )
}

export default Register
