import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizeContext from '../config/AuthorizeContext';

const Home = () => {
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();
  useEffect(() => {
    !user && navigate('/login', { replace: true });
  }, []);

  return (
    <>
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">
          <h1>How You Dooing?</h1>
        </div>
        <div className="card-body">
          <h4 className="card-title">Sign up if you haven't</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
