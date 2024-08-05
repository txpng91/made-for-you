import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateCart } from '../api';

const ProductItem = ({
  token,
  products,
  product,
  cart,
  setCart,
  setQuantity,
  id,
}) => {
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

  // Handler to add an item inside products of a cart
  const handleClick = async (producttoadd) => {
    try {
      const updateUserCart = () => {
        /*
         If there's an existing item in the cart,
         then find the index of the item in the array of object state
        */
        const existingItem = cart.find(
          (item) => item.productid === producttoadd.id
        );
        // If the item is found, ...
        if (existingItem) {
          // Create a copy of the item and update it its key(s)
          return cart.map((item) => {
            return item.productid === producttoadd.id
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
            productid: producttoadd.id,
            quantity: 1,
          },
        ];
      };

      const updatedCart = await updateUserCart(producttoadd);
      await updateCart(id, updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error('Unable to update cart: ', error);
    }
  };

  return (
    <div className='product' key={product.id}>
      <img className='product-image' src={product.image} alt={product.title} />
      <div className='product-info'>
        <h3>{product.title.substring(0, 15)} ...</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>

      <div className='product-options'>
        {token && (
          <button onClick={() => handleClick(product)} className='add-btn'>
            Add to Cart
          </button>
        )}
        <Link className='view-link' to={`/products/${product.id}`}>
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
