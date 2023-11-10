import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getUsersCart, getAllProducts } from './api';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import './style.css';
import ViewProduct from './components/ViewProduct';
import Checkout from './components/Checkout';

function App() {
  const navigate = useNavigate();
  // Passed data variables
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || null
  );
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);

  // Navbar adjustmenst for mobile settings
  const [mobile, setMobile] = useState(false);
  const handleClick = () => setMobile(!mobile);
  const closeMobileMenu = () => setMobile(false);
  const Mobile = () => {
    if (window.innerWidth >= 425) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  };

  useEffect(() => {
    Mobile();
  }, []);

  // Store JSON web token into local storage
  useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      window.localStorage.removeItem('token');
    }
  }, [token]);

  // Fetch all posts with useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts(token);
      setProducts(response);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);

  // Fetch user data and cart by username
  useEffect(() => {
    if (token) {
      const fetchUserCart = async () => {
        const usersCart = await getUsersCart(userData.id);
        setCart(usersCart.products);
      };
      fetchUserCart();
    }
  }, [token]);

  // Function to get quantity for all items
  function allQuantity() {
    return cart.reduce((quantitySum, item) => {
      const product = products.find((product) => product.id === item.productId);
      if (product) {
        return quantitySum + item.quantity;
      }
      return quantitySum;
    }, 0);
  }

  // Manage the side effect with quantity
  useEffect(() => {
    const quantitySum = allQuantity();
    setQuantity(quantitySum); // Return quantity all listed items to products
  }, [cart, products]);

  // Removing data to log out
  const logOut = (e) => {
    e.preventDefault();
    setToken(null);
    setUserData({});
    setCart([]);
    closeMobileMenu();
    navigate('/');
  };

  return (
    <>
      <div id='navbar'>
        {token ? (
          <span className='icon-name'>Hello, {userData?.firstname}!</span>
        ) : (
          <span className='icon-name'>Made For You</span>
        )}
        <div className='menu-icon' onClick={handleClick}>
          <i className={mobile ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <div id='links' className={mobile ? 'links-active' : 'links'}>
          {token ? (
            <>
              <button className='link' onClick={logOut}>
                Log Out
              </button>
              <span
                className='material-symbols-outlined link'
                onClick={() => {
                  navigate('/cart');
                  closeMobileMenu();
                }}
              >
                shopping_bag{' '}
                {quantity > 0 && <p className='bag-number'>{quantity}</p>}
              </span>
              <Link onClick={closeMobileMenu} to={'/profile'}>
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link onClick={closeMobileMenu} to={'/users/login'}>
                Login
              </Link>
              {/* Sign Up function remove during process of backend development */}
              {/* <Link onClick={closeMobileMenu} to={'/users/sign-up'}>
                Sign Up
              </Link> */}
            </>
          )}
          <Link onClick={closeMobileMenu} to={'/products'}>
            Products
          </Link>
          <Link onClick={closeMobileMenu} to={'/'}>
            Home
          </Link>
        </div>
      </div>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route
          path='/users/:action'
          element={
            <AccountForm
              setToken={setToken}
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path='/products'
          element={
            <Products
              setProducts={setProducts}
              setQuantity={setQuantity}
              products={products}
              cart={cart}
              setCart={setCart}
              setToken={setToken}
              token={token}
            />
          }
        />
        <Route
          path='/products/:id'
          element={<ViewProduct products={products} />}
        />
        <Route
          path='/cart'
          element={
            <Cart
              products={products}
              cart={cart}
              setCart={setCart}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path='/checkout'
          element={
            <Checkout products={products} cart={cart} quantity={quantity} />
          }
        />
        <Route
          path='/profile'
          element={<Profile setUserData={setUserData} userData={userData} />}
        />
      </Routes>
    </>
  );
}

export default App;
