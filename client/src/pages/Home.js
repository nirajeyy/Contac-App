import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';

const Home = () => {
  const { user } = useContext(AuthorizeContext);
  const [favContacts, setFavContacts] = useState([]);

  const fetchFavouriteContacts = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();
      const filter = result.contacts.filter((resu) => {
        return resu.isfavourite === true;
      });
      setFavContacts(filter);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavouriteContacts();
  }, []);

  return (
    <>
      <div
        className="card text-white bg-dark mb-3"
        style={{ borderRadius: '15px' }}
      >
        <div className="card-header">
          <h1>Welcome {user ? user.name : null} 🚀</h1>
        </div>
        <div className="card-body">
          <h4 className="card-title">A place for all of your contacts</h4>
        </div>
      </div>

      <Link to="/create">
        <button type="button" className="btn btn-outline-dark">
          Create New Contact
        </button>
      </Link>
      {favContacts.length >= 1 ? (
        <>
          <h2 className="mt-5">Your Favourite Contacts ❤️🦄</h2>

          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {favContacts.map((favcontact) => (
              <Link to="/mycontacts" key={favcontact._id}>
                <div
                  className="card text-white bg-info mb-3"
                  style={{ maxWidth: '20rem', borderRadius: '15px' }}
                  key={favcontact._id}
                >
                  <div className="card-body">
                    <h4 className="card-title">{favcontact.name}</h4>
                    <div className="card-text">
                      <h6>Address: {favcontact.address}</h6>
                      <h6>Email:{favcontact.email} </h6>
                      <h6>Phone:{favcontact.phone}</h6>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
