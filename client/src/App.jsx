import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getUsersCart, getAllProducts, getUserData, updateCart } from './api';
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
  const [id, setId] = useState(window.localStorage.getItem('id') || null);
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

  // Store user id into local storage
  useEffect(() => {
    if (id) {
      window.localStorage.setItem('id', id);
    } else {
      window.localStorage.removeItem('id');
    }
  }, [id]);

  // Fetch all products with useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts(token);
      setProducts(response);
    };
    fetchProducts();
  }, []);

  // Fetch user data and cart by username
  useEffect(() => {
    if (token && id) {
      const fetchUserDataAndCart = async () => {
        const data = await getUserData(id);
        const usersCart = await getUsersCart(id);
        setUserData(data);
        setCart(usersCart.products);
      };
      fetchUserDataAndCart();
    }
  }, [token]);

  // Function to get quantity for all items
  function allQuantity() {
    return cart.reduce((quantitySum, item) => {
      const product = products.find((product) => product.id === item.productid);
      if (product) {
        return quantitySum + item.quantity;
      }
      return quantitySum;
    }, 0);
  }

  // Manage the side effect with quantity
  useEffect(() => {
    if (cart && id) {
      const quantitySum = allQuantity();
      setQuantity(quantitySum); // Return quantity all listed items to products
      setCart(cart);
    }
  }, [cart]);

  // Removing data to log out
  const logOut = (e) => {
    e.preventDefault();
    setToken(null);
    setId(null);
    setUserData({});
    setCart([]);
    closeMobileMenu();
    navigate('/');
  };

  console.log(cart);

  return (
    <>
      <div id='navbar'>
        {userData.firstname ? (
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
              <Link onClick={closeMobileMenu} to={'/users/sign-up'}>
                Sign Up
              </Link>
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
          element={<AccountForm setToken={setToken} setId={setId} />}
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
              id={id}
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
              id={id}
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
