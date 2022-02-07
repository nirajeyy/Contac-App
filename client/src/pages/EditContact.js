import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';
import { ToastContainer, toast } from 'react-toastify';

const EditContact = () => {
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   !user && navigate('/login', { replace: true });
  // }, []);

  return (
    <>
      <ToastContainer autoClose={3200} />
      <h1>Edit the contact</h1>
      <form>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            // value={userCredentials.name}
            // onChange={handleOnChange}
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
            // value={userCredentials.address}
            // onChange={handleOnChange}
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
            // value={userCredentials.email}
            // onChange={handleOnChange}
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
            // value={userCredentials.phone}
            // onChange={handleOnChange}
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
