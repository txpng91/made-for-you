import React, { useState } from 'react';
import ProductItem from './ProductItem';

const Products = ({ products, token }) => {
  const [searchParams, setsearchParams] = useState('');
  const [filter, setFilter] = useState('');

  // Conditional rendering array
  const filteredProducts =
    (searchParams &&
      products.filter((product) =>
        product.title.toLowerCase().includes(searchParams)
      )) ||
    (filter && products.filter((filtered) => filtered.category === filter));

  const displayProducts = filteredProducts ? filteredProducts : products;

  return (
    <>
      <div className='product-actions'>
        <div className='searchbar'>
          <label>
            Search:{' '}
            <input
              type='text'
              value={searchParams}
              onChange={(e) => {
                setsearchParams(e.target.value);
              }}
              placeholder='Find a Product'
            />
          </label>
        </div>
        <div className='product-categories'>
          <button className='category-btn' onClick={() => setFilter(null)}>
            All
          </button>
          <button
            className='category-btn'
            onClick={() => setFilter("men's clothing")}
          >
            Men
          </button>
          <button
            className='category-btn'
            onClick={() => setFilter("women's clothing")}
          >
            Women
          </button>
          <button
            className='category-btn'
            onClick={() => setFilter('jewelery')}
          >
            Jewelery
          </button>
          <button
            className='category-btn'
            onClick={() => setFilter('electronics')}
          >
            Electronics
          </button>
        </div>
      </div>
      <div className='products-container'>
        {displayProducts.map((product) => {
          return (
            <ProductItem key={product.id} product={product} token={token} />
          );
        })}
      </div>
    </>
  );
};

export default Products;
