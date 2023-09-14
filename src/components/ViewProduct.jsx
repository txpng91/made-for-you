import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAProduct } from '../api';

function ViewProduct({ products }) {
  const params = useParams();
  const product = products.find(
    (product) => product.id === parseInt(params.id)
  );

  const navigate = useNavigate();

  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const res = await getAProduct(params.id);
  //     setProduct(res);
  //   };
  //   fetchProduct();
  // }, []);

  return (
    <div className='product-view'>
      <div className='details-image-cover'>
        <img
          className='details-image'
          src={product?.image}
          alt={product?.title}
        />
      </div>
      <div className='product-details'>
        <h4 className='details-category'>{product?.category}</h4>
        <h2 className='details-title'>{product?.title}</h2>
        <p className='details-rating'>
          Rating {product?.rating && product.rating.rate}
        </p>
        <h3 className='details-price'>$ {(product?.price).toFixed(2)}</h3>
        <p className='details-description'>{product?.description}</p>
        <div className='options'>
          <button className='return' onClick={() => navigate(`/products`)}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
