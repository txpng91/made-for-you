import React from 'react';

const ProductItem = ({ product, token, setCart }) => {
  // Handler to add an item inside products of a cart
  const handleClick = (producttoadd) => {
    setCart((cart) => {
      /*
       If there's an existing item in the cart,
       then find the index of the item in the array of object state
      */
      const existingItem = cart.find(
        (item) => item.productId === producttoadd.id
      );
      // If the item is found, ...
      if (existingItem) {
        // Create a copy of the item and update it its key(s)
        return cart.map((item) => {
          return item.productId === producttoadd.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item;
        });
      }
      // If the there not an existing id for the cart, add a new item to the cart...
      return [
        // spread the the current cart
        ...cart,
        // add new item
        {
          productId: producttoadd.id,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className='product' key={product.id}>
      <div className='product-info'>
        <img
          className='product-image'
          src={product.image}
          alt={product.title}
        />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
        <p>Rating {product.rating.rate}</p>
      </div>
      {token && (
        <button onClick={() => handleClick(product)} className='add-btn'>
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductItem;
