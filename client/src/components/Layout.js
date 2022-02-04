import Navbar from './Navbar';

const Layout = ({ showNav = 'true', children }) => {
  return (
    <>
      {showNav && <Navbar />}
      <div className="container mt-5">{children}</div>;
    </>
  );
};

export default Layout;
