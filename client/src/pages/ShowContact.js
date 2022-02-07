import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const ShowContact = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();
  const [detailedContact, setDetailedContact] = useState(false);
  const [modalData, setModalData] = useState({});
  const [favChanged, setFavChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        console.log(result.contacts);
        setContacts(result.contacts);
      } else {
        console.log(result.error);
      }
      if (modalData && !!favChanged) {
        setModalData({
          ...modalData,
          isfavourite: !modalData.isfavourite,
        });
        setFavChanged(false);
      }
      if (!!isLoading) {
        setLoading(false);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [favChanged, isLoading]);

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        toast.info('Contact Deleted Successfully');
        setDetailedContact(false);
        setLoading(true);
      } else {
        console.log(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setFavourite = async (id, value) => {
    try {
      const body = {
        isfavourite: !value,
      };
      await fetch(`http://localhost:8000/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      {
        !!value
          ? toast.success(`${modalData.name} removed from favourites`)
          : toast.success(`${modalData.name} added to favourites`);
      }
      setFavChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3200} theme="dark" />
      {contacts.length === 0 ? (
        <>
          <h1>You have no contacts </h1>
          <Link to="/create">
            <button type="button" class="btn btn-outline-dark">
              Create New Contact
            </button>
          </Link>
        </>
      ) : (
        <>
          <h1>Your Contacts</h1>

          <table className="table table-hover" style={{ borderRadius: '15px' }}>
            <thead className="bg-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  className="table-dark"
                  key={contact._id}
                  onClick={() => {
                    setModalData({});
                    setModalData(contact);
                    setDetailedContact(true);
                  }}
                >
                  <th scope="row">{contact.name}</th>
                  <td>{contact.address}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>Total Contacts: {contacts.length}</h5>
          <Modal
            show={detailedContact}
            onHide={() => setDetailedContact(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>{modalData.name}</strong>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={require('../lfpp.jpg')}
                  alt="imagemf"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '15px',
                  }}
                />
              </div>
              <div
                onClick={() =>
                  setFavourite(modalData._id, !!modalData.isfavourite)
                }
                className="favourite icon"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                {modalData.isfavourite ? (
                  <img
                    src={require('../assets/redHeart.png')}
                    alt="redheart"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                ) : (
                  <img
                    src={require('../assets/greyHeart.png')}
                    alt="greyheart"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                )}
              </div>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  fontColor: 'black',
                  justifyContent: 'center',
                }}
              >
                <h5>
                  <strong>Address:</strong> {modalData.address}
                </h5>
                <h5>
                  <strong>Email:</strong> {modalData.email}
                </h5>
                <h5>
                  <strong>Phone:</strong> {modalData.phone}
                </h5>
              </div>
            </Modal.Body>

            <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/editcontact?id=${modalData._id}`}>
                <button
                  className="btn btn-outline-info"
                  onClick={() => setDetailedContact(false)}
                >
                  Edit
                </button>
              </Link>

              <button
                className="btn btn-outline-danger"
                onClick={() => deleteContact(modalData._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => setDetailedContact(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ShowContact;
