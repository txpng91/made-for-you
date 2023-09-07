import React, { useEffect, useState } from 'react';

function Cart({ products, cart, setCart }) {
  const [myCheckout, setMyCheckout] = useState(null);
  const [quantities, setQuantities] = useState(null);
  const [subtotal, setSubtotal] = useState(null);

  useEffect(() => {
    if (cart) {
      const ids = cart.products.map((id) => id.productId);
      const quantities = cart.products.map((product) => product.quantity);
      const pricing = [];
      const items = [];
      ids.map((filter) => {
        const item = products.find((product) => product.id === filter);
        items.push(item);
      });
      items.map((item) => {
        const pricePerItem = item.price * quantities[item.id - 1];
        pricing.push(pricePerItem);
      });
      const sum = pricing.reduce((accumulator, value) => accumulator + value);
      setSubtotal(sum);
      setMyCheckout(items);
      setQuantities(quantities);
    }
  }, [cart]);

  return (
    <div className='cart-status'>
      {myCheckout ? (
        <div className='cart-page'>
          <h1>Cart</h1>
          <div className='cart'>
            {myCheckout.map((item) => {
              const quantity = quantities[item?.id - 1];
              return (
                <div key={item?.id} className='item'>
                  <img
                    className='item-image'
                    src={item?.image}
                    alt={item?.title}
                  />
                  <h2>{item?.title}</h2>
                  <p>${item?.price}</p>
                  <p>Quantity:{quantity}</p>
                  <p>Price: {item?.price * quantity}</p>
                </div>
              );
            })}
          </div>
          <div className='checkout-section'>
            <h2>Subtotal: ${subtotal}</h2>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Cart;
