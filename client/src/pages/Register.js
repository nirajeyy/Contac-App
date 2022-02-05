import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizeContext from '../config/AuthorizeContext';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { registerUser } = useContext(AuthorizeContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error('Please Enter all the fields');
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    let dummyCred = { ...credentials, confirmPassword: undefined };
    registerUser(dummyCred);
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
      <h3>Sign Up</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            onChange={handleOnChange}
            value={credentials.name}
            // required
          />
        </div>
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
          <small id="emailHelp" className="form-text text-muted">
            email@example.com
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="passWordInput" className="form-label mt-4">
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
          <small id="emailHelp" className="form-text text-muted">
            Must be greater than six characters.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleOnChange}
            placeholder="Enter Password"
            // required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
        <Link to="/login">
          <p className="mt-3">Already Signed Up?</p>
        </Link>
      </form>
    </>
  );
};

export default Register;
