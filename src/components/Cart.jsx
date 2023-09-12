import React, { useEffect, useState } from 'react';

function Cart({ products, cart, setCart }) {
  // Create cost state for the entire cart
  const [subtotal, setSubtotal] = useState(0);
  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.productId);
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

  // Filter the products with
  const getAllItemDetails = (item) => {
    return products.find((product) => product.id === item.productId);
  };

  // Increment the quantity of a current item
  const incrementQty = (id) => {
    setCart((cart) => {
      /*
       Find the index of the existing item in the cart array state
      */
      const existingItem = cart.find((item) => item.productId === id);
      // If the item is found, ...
      if (existingItem) {
        // Create a copy of the item and update it its key(s)
        return cart.map((item) => {
          return item.productId === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item;
        });
      }
    });
  };

  // Decrement the quanity of a current value
  const decrementQty = (id) => {
    setCart((cart) => {
      /*
       Find the index of the existing item in the cart array state
      */
      const existingItem = cart.find((item) => item.productId === id);
      // If the item is found, ...
      if (existingItem) {
        // If the existing cart item has a quantity of 1
        if (existingItem.quantity === 1) {
          // Return acrt that filtered the desired item
          return cart.filter(
            (item) => item.productId !== existingItem.productId
          );
        }
        // Create a copy of the item and update it its key(s)
        return cart.map((item) => {
          return item.productId === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item;
        });
      }
    });
  };

  return (
    <div className='cart-page'>
      <div className='cart'>
        {cart.map((item) => {
          // Create a variable that calls the filter products passing the current item
          const productItem = getAllItemDetails(item);
          return (
            // Pass cart keys and filtered product keys
            <div key={item.productId} className='item'>
              <img
                className='item-image'
                src={productItem.image}
                alt={productItem?.title}
              />
              <h2 className='cart-values'>{productItem?.title}</h2>
              <p className='cart-values'>${(productItem?.price).toFixed(2)}</p>
              <div className='quantity-section'>
                <button
                  onClick={() => decrementQty(item.productId)}
                  className='decre-btn'
                >
                  -
                </button>
                <p className='cart-values'>{item?.quantity}</p>
                <button
                  onClick={() => incrementQty(item.productId)}
                  className='incre-btn'
                >
                  +
                </button>
              </div>
              <p className='cart-values'>
                ${(productItem?.price * item?.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      <div className='checkout-section'>
        <h2 className='cartSubtotal'>
          {!subtotal
            ? 'Your Cart is empty!'
            : `Subtotal: ${subtotal.toFixed(2)}`}
        </h2>
      </div>
    </div>
  );
}

export default Cart;
