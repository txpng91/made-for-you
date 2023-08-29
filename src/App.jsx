import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import './style.css';

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem('token' || null)
  );

  return (
    <div id='app'>
      <div id='navbar'>
        <span className='icon-name'>Made For You</span>
        <Link to={'/account/login'}>Login</Link>
        <Link to={'/account/sign-up'}>Sign Up</Link>
        <Link to={'/'}>Home</Link>
      </div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route
          path='/account/:action'
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
