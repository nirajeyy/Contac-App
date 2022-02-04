import Layout from './components/Layout';
import { Routes as Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Switch>
    </Layout>
  );
};

export default App;
