import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../api';

function Cart({ products, cart, setCart, setQuantity, id }) {
  // Navigator created
  const navigate = useNavigate();

  // Create cost state for the entire cart
  const [subtotal, setSubtotal] = useState(0);

  // Function to add all prices for the listed items in the cart
  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.productid);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  }

  // Manage the side effects with subtotal
  useEffect(() => {
    const total = getCartTotal();
    setSubtotal(total);
  }, [cart, products]);

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

  // Filter the products with the listed items in the cart
  const getAllItemDetails = (cartItem) => {
    return products.find((product) => product.id === cartItem.productid);
  };

  // Manage the side effect with quantity
  useEffect(() => {
    if (cart && id) {
      const quantitySum = allQuantity();
      setQuantity(quantitySum); // Return quantity all listed items to products
      setCart(cart);
    }
  }, [cart]);

  // Increment the quantity of a current item
  const incrementQty = async (productid) => {
    try {
      const updateUserCart = () => {
        /*
      Find the index of the existing item in the cart array state
     */
        const existingItem = cart.find((item) => item.productid === productid);
        // If the item is found, ...
        if (existingItem) {
          // Create a copy of the item and update its key(s)
          return cart.map((item) => {
            return item.productid === productid
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item;
          });
        }
      };
      const updatedCart = await updateUserCart(productid);
      await updateCart(id, updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error('Unable to update cart: ', error);
    }
  };

  // Decrement the quanity of a current value
  const decrementQty = async (productid) => {
    try {
      const updateUserCart = () => {
        /*
      Find the index of the existing item in the cart array state
     */
        const existingItem = cart.find((item) => item.productid === productid);
        // If the item is found, ...
        if (existingItem) {
          // If the existing cart item has a quantity of 1
          if (existingItem.quantity === 1) {
            // Return array that filtered the desired item
            return cart.filter(
              (item) => item.productid !== existingItem.productid
            );
          }
          // Create a copy of the item and update it its key(s)
          return cart.map((item) => {
            return item.productid === productid
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item;
          });
        }
      };
      const updatedCart = await updateUserCart(productid);
      await updateCart(id, updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error('Unable to update cart: ', error);
    }
  };

  // Remove item from a cart without quantity condition
  const removeItem = async (productid) => {
    try {
      const updatedCart = cart.filter((item) => item.productid !== productid);
      await updateCart(id, updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error('Unable to remove item from cart: ', error);
    }
  };

  return (
    <div className='cart-page'>
      <div className='cart'>
        {cart.map((cartItem) => {
          // Create a variable that calls the filter products passing the current item
          const productItem = getAllItemDetails(cartItem);
          return (
            // Pass cart keys and filtered product keys
            <div key={cartItem.productid} className='item'>
              <img
                className='item-image'
                src={productItem?.image}
                alt={productItem?.title}
              />
              <h2
                className='item-title'
                onClick={() => navigate(`/products/${cartItem.productid}`)}
              >
                {productItem?.title}
              </h2>
              <p className='cart-values'>${productItem?.price}</p>
              <div className='quantity-section'>
                <button
                  onClick={() => decrementQty(cartItem.productid)}
                  className='decre-btn'
                >
                  -
                </button>
                <p className='cart-values'>{cartItem?.quantity}</p>
                <button
                  onClick={() => incrementQty(cartItem.productid)}
                  className='incre-btn'
                >
                  +
                </button>
              </div>
              <button
                className='remove-item-btn'
                onClick={() => removeItem(cartItem.productid)}
              >
                Remove
              </button>
              <p className='cart-values'>
                ${(productItem?.price * cartItem?.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      {!subtotal ? (
        <div className='checkout-section'>
          <h2 className='cartSubtotal'>Your Cart is empty!</h2>
        </div>
      ) : (
        <div className='checkout-section'>
          <h2 className='cartSubtotal'>Subtotal: ${subtotal.toFixed(2)}</h2>
          <button
            className='checkout-btn'
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
