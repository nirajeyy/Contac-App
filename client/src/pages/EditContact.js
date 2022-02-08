import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';
import { ToastContainer, toast } from 'react-toastify';

const EditContact = () => {
  const { id } = useParams();
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      console.log(result);
      setUserCredentials({
        name: result.name,
        address: result.address,
        email: result.email,
        phone: result.phone,
      });
      setloading(false);
      toast.info(`Edit ${result.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setCredentials({ ...credentials, [name]: value });
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userCredentials),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`${userCredentials.name} updated successfully`);
      setUserCredentials({ name: '', address: '', email: '', phone: '' });
      navigate('/mycontacts');
    } else {
      toast.error(`${result.error} added successfully`);
    }
  };
  useEffect(() => {
    fetchData();
    setloading(false);
  }, []);

  return (
    <>
      <ToastContainer autoClose={3200} theme="dark" />
      <h1>Edit Contact</h1>
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
          value="Save Changes"
          className="btn btn-outline-dark mt-5"
        />
      </form>
    </>
  );
};

export default EditContact;
