import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getUsersCart, getAllProducts, getUsers } from './api';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import './style.css';

function App() {
  const navigate = useNavigate();
  // Passed data variables
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || null
  );
  const [passedUsername, setPassedUsername] = useState(
    window.localStorage.getItem('passedUsername' || null)
  );
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);

  // Store JSON web token into local storage
  useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      window.localStorage.removeItem('token');
    }
  }, [token]);

  // Store username that was passed from login form in to local storage
  useEffect(() => {
    if (passedUsername) {
      window.localStorage.setItem('passedUsername', passedUsername);
    } else {
      window.localStorage.removeItem('passedUsername');
    }
  }, [passedUsername]);

  // Fetch all posts with useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts(token);
      setProducts(response);
    };
    fetchProducts();
  }, []);

  // Fetch user data and cart by username
  useEffect(() => {
    if (token) {
      const fetchUserDataandCart = async () => {
        const user = await getUsers(passedUsername);
        const usersCart = await getUsersCart(user.id);
        setUserData(user);
        setCart(usersCart);
      };
      fetchUserDataandCart();
    }
  }, [passedUsername]);

  // Removing data to log out
  const logOut = (e) => {
    e.preventDefault();
    setToken(null);
    setUserData(null);
    setCart(null);
    setPassedUsername(null);
    navigate('/');
  };

  return (
    <div id='app'>
      <div id='navbar'>
        {userData ? (
          <span className='icon-name'>Hello, {userData?.name?.firstname}!</span>
        ) : (
          <span className='icon-name'>Made For You</span>
        )}
        {token ? (
          <>
            <Link to={'/cart'}>
              Cart {cart?.length && <span>{cart?.length}</span>}
            </Link>
            <Link>
              <button className='link' onClick={logOut}>
                Log Out
              </button>
            </Link>
            <Link to={'/profile'}>Profile</Link>
          </>
        ) : (
          <>
            <Link to={'/account/login'}>Login</Link>
            <Link to={'/account/sign-up'}>Sign Up</Link>
          </>
        )}
        <Link to={'/products'}>Products</Link>
        <Link to={'/'}>Home</Link>
      </div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route
          path='/account/:action'
          element={
            <AccountForm
              setToken={setToken}
              setPassedUsername={setPassedUsername}
            />
          }
        />
        <Route
          path='/products'
          element={
            <Products
              setProducts={setProducts}
              products={products}
              cart={cart}
              setCart={setCart}
              setToken={setToken}
              token={token}
            />
          }
        />
        <Route
          path='/cart'
          element={<Cart products={products} cart={cart} setCart={setCart} />}
        />
        <Route
          path='/profile'
          element={<Profile setUserData={setUserData} userData={userData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
