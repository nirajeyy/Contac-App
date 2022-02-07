import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';
import ShowContact from './ShowContact';

const Home = () => {
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">
          <h1>Welcome {user ? user.name : null}</h1>
        </div>
        <div className="card-body">
          <h4 className="card-title">A place for all of your contacts</h4>
        </div>
      </div>

      <Link to="/create">
        <button type="button" class="btn btn-outline-dark">
          Create New Contact
        </button>
      </Link>
      {/* <ShowContact /> */}
    </>
  );
};

export default Home;
