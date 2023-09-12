import React, { useEffect, useState } from 'react';

function Cart({ products, cart }) {
  const [subtotal, setSubtotal] = useState(0);

  //const ids = cart.map((cart) => cart.productId);

  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.productId);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  }
  useEffect(() => {
    const total = getCartTotal();
    setSubtotal(total);
  }, [cart, products]);

  const getAllItemDetails = (item) => {
    return products.find((product) => product.id === item.productId);
  };

  return (
    <div className='cart-page'>
      <h1>Cart</h1>
      <div className='cart'>
        {cart.map((item) => {
          const productItem = getAllItemDetails(item);
          return (
            <div key={item.productId} className='item'>
              <img
                className='item-image'
                src={productItem.image}
                alt={productItem?.title}
              />
              <h2>{productItem?.title}</h2>
              <p>${(productItem?.price).toFixed(2)}</p>
              <p>Quantity:{item?.quantity}</p>
              <p>Price: {(productItem?.price * item?.quantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>
      <div className='checkout-section'>
        <h2 className='cartSubtotal'>
          {!subtotal ? 'Loading...' : `Subtotal: ${subtotal.toFixed(2)}`}
        </h2>
      </div>
    </div>
  );
}

export default Cart;
