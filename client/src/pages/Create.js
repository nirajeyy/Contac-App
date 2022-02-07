import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userCredentials),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`${userCredentials.name} added successfully`);
      setUserCredentials({ name: '', address: '', email: '', phone: '' });
      navigate('/', { replace: true });
    } else {
      toast.error(`${result.error} added successfully`);
    }
    navigate('/mycontacts', { replace: true });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setCredentials({ ...credentials, [name]: value });
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <>
      <ToastContainer autoClose={3200} />
      <h1>Create New Contact</h1>
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
            value={userCredentials.name}
            onChange={handleOnChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userCredentials.address}
            onChange={handleOnChange}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userCredentials.email}
            onChange={handleOnChange}
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userCredentials.phone}
            onChange={handleOnChange}
            placeholder="+977 9817198789"
            required
          />
        </div>
        <input
          type="submit"
          value="Add"
          className="btn btn-outline-dark mt-5"
        />
      </form>
    </>
  );
};

export default Create;
