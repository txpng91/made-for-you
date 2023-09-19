import React, { useState } from 'react';
import ProductItem from './ProductItem';

const Products = ({
  products,
  setProducts,
  token,
  setCart,
  cart,
  setQuantity,
}) => {
  const [searchParams, setsearchParams] = useState('');
  const [filter, setFilter] = useState('');

  // Conditional rendering array
  const filteredProducts =
    (searchParams &&
      products.filter((product) =>
        product.title.toLowerCase().includes(searchParams.toLowerCase())
      )) ||
    (filter && products.filter((filtered) => filtered.category === filter));

  const displayProducts = filteredProducts ? filteredProducts : products;

  const sortProductsByName = () => {
    const sortByName = products.toSorted((a, b) =>
      a.title.localeCompare(b.title)
    );
    setProducts(sortByName);
  };
  const sortProductsByPrice = () => {
    const sortByPrice = products.toSorted((a, b) => a.price - b.price);
    setProducts(sortByPrice);
  };

  return (
    <>
      <div className='product-actions'>
        <div className='searchbar'>
          <label>
            Search:{' '}
            <input
              name='searchParams'
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
        <div className='sort-products'>
          <button className='sort-btn' onClick={() => sortProductsByPrice()}>
            Sort by Price
          </button>
          <button className='sort-btn' onClick={() => sortProductsByName()}>
            Sort by Name
          </button>
          {/* <button className='sort-btn' onClick={() => setProducts(products)}>
            Default
          </button> */}
        </div>
      </div>
      <div className='products-container'>
        {displayProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              setCart={setCart}
              cart={cart}
              product={product}
              token={token}
              products={products}
              setQuantity={setQuantity}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;
