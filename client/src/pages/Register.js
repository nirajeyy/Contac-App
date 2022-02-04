import { Link } from 'react-router-dom';
import { useState } from 'react';
const Register = () => {
  const [credentials, setCredentails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentails({ ...credentials, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Registered ', credentials);
  };
  return (
    <>
      <h3>Sign Up</h3>
      <form onSubmit={handleOnSubmit}>
        <div class="form-group">
          <label for="nameInput" class="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            name="name"
            onChange={handleOnChange}
            value={credentials.name}
            required
          />
        </div>
        <div class="form-group">
          <label for="emailInput" class="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            aria-describedby="emailHelp"
            placeholder="email@example.com"
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            email@example.com
          </small>
        </div>
        <div class="form-group">
          <label for="passWordInput" class="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            Must be greater than six characters.
          </small>
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleOnChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-3">
          Register
        </button>
        <Link to="/login">
          <p class="mt-3">Already Signed Up?</p>
        </Link>
      </form>
    </>
  );
};

export default Register;
