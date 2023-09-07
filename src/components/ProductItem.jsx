import React from 'react';

const ProductItem = ({ product, token }) => {
  return (
    <div className='product' key={product.id}>
      <div className='product-info'>
        <img
          className='product-image'
          src={product.image}
          alt={product.title}
        />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>Rating {product.rating.rate}</p>
      </div>
      {token && <button className='add-btn'>Add to cart</button>}
    </div>
  );
};

export default ProductItem;
