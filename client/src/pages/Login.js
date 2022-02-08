import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizeContext from '../config/AuthorizeContext';

const Login = () => {
  const { loginUser } = useContext(AuthorizeContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  //token cha bhane navigate to home
  useEffect(() => {
    localStorage.getItem('token') && navigate('/', { replace: true });
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setCredentials({ ...credentials, [name]: value });
    setCredentials({ ...credentials, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      // toast.error('Please Enter all the fields'); //from server
    }

    loginUser(credentials);
  };

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h3>Login</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            aria-describedby="emailHelp"
            placeholder="email@example.com"
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            // required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <Link to="/register">
          <p className="mt-3">Haven't Signed UP yet?</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
