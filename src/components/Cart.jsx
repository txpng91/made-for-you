import React, { useEffect, useState } from 'react';

function Cart({ products, cart, setCart }) {
  const [myCheckout, setMyCheckout] = useState(null);

  useEffect(() => {
    if (cart) {
      const ids = cart.products.map((id) => id.productId);
      const items = [];
      ids.map((filter) => {
        const item = products.find((product) => product.id === filter);
        items.push(item);
      });
      setMyCheckout(items);
    }
  }, [cart]);

  return (
    <div className='cart'>
      {myCheckout ? <p>We have some data</p> : <h1>Loading...</h1>}
    </div>
  );
}

export default Cart;
