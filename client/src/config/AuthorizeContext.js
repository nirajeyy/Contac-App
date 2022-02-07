import { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AuthorizeContext = createContext();

export const AuthorizeContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    userPersistant();
  }, []);
  //login request
  const loginUser = async (userCred) => {
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userCred }),
      });
      const userToken = await res.json();

      if (!userToken.error) {
        setUser(userToken.user);
        localStorage.setItem('token', userToken.token);
        toast.success(`Welcome ${userToken.user.name} `);
        navigate('/', { replace: true });
      } else {
        setError(userToken.error);
        toast.error(userToken.error);

        setError(null);
        return;
      }
      console.log('established', userToken);
    } catch (err) {
      console.log(err);
    }
  };
  // login persistnce

  const userPersistant = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { replace: true });
    }
    try {
      const res = await fetch('http://localhost:8000/api/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUser(result);
        navigate(window.location.pathname, { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //register request
  const registerUser = async (cred) => {
    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...cred }),
      });
      const userRegToken = await res.json(); // userRegToken is the response by the serfer--userinfo
      if (!userRegToken.error) {
        toast.success('Registration Successful');
        navigate('/login', { replace: 'true' });
      } else {
        setError(userRegToken.error);
        toast.error(userRegToken.error);
        return;
      }
      console.log('registration successful', userRegToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthorizeContext.Provider
      value={{ loginUser, registerUser, user, setUser }}
    >
      <ToastContainer autoClose={3000} />
      {children}
    </AuthorizeContext.Provider>
  );
};

export default AuthorizeContext;
