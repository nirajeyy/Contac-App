import { Link } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setCredentials({ ...credentials, [name]: value });
    setCredentials({ ...credentials, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleOnSubmit}>
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
        </div>
        <div class="form-group">
          <label for="passwordInput" class="form-label mt-4">
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
        </div>
        <button type="submit" class="btn btn-primary mt-3">
          Login
        </button>
        <Link to="/register">
          <p class="mt-3">Haven't Signed UP yet?</p>
        </Link>
      </form>
    </>
  );
};

export default Login;
