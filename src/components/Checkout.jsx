import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ products, cart, quantity }) {
  // Navigator created
  const navigate = useNavigate();

  // Create cost state for the entire cart
  const [subtotal, setSubtotal] = useState(0);

  // Function to add all prices for the listed items in the cart
  function getCartTotal() {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.productid);
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

  // Filter the products with the listed items in the cart
  const getAllItemDetails = (item) => {
    return products.find((product) => product.id === item.productid);
  };

  return (
    <div className='checkout'>
      {/* Billing Section */}
      <div className='billing'>
        <h2 className='billing-header'>Billing Address</h2>
        <form className='billing-form'>
          <label htmlFor='firstname'>First Name</label>
          <input placeholder='First Name' type='text' required />
          <label htmlFor='lastname'>Last Name</label>
          <input placeholder='Last Name' type='text' required />
          <label htmlFor='username'>Username</label>
          <input placeholder='Username' type='text' required />
          <label htmlFor='email'>Email</label>
          <input placeholder='Email' type='text' required />
          <label htmlFor='address'>Address</label>
          <input placeholder='1234 Main St' type='text' required />
          <label htmlFor='address2'>Address 2 (Optional)</label>
          <input placeholder='Appartment or suite' type='text' required />
          <div className='state-country-zip'>
            <div className='scz-div'>
              <label htmlFor='state'>State</label>
              <select required name='form-select' id='state'>
                <option value=''>Choose...</option>
                <option>Florida</option>
                <option>Virginia</option>
                <option>Texas</option>
                <option>Tennessee</option>
              </select>
            </div>
            <div className='scz-div'>
              <label htmlFor='country'>Country</label>
              <select required name='form-select' id='country'>
                <option value=''>Choose...</option>
                <option>United States</option>
              </select>
            </div>
            <div className='scz-div'>
              <label htmlFor='zip'>Zip</label>
              <input type='text' required />
            </div>
          </div>

          <hr />
          <div className='form-check'>
            <input type='checkbox' id='same-address' />
            <label htmlFor='same-address'>
              Shipping address is the same as my billing address
            </label>
          </div>
          <div className='form-check'>
            <input type='checkbox' id='save-info' />
            <label htmlFor='save-info'>
              Save this information for next time
            </label>
          </div>
          <hr />
          <h3>Payment</h3>
          <div className='payment-type'>
            <div className='form-check'>
              <input type='radio' id='credit' />
              <label htmlFor='credit'>Credit Card</label>
            </div>
            <div className='form-check'>
              <input type='radio' id='debit' />
              <label htmlFor='debit'>Debit Card</label>
            </div>
            <div className='form-check'>
              <input type='radio' id='paypal' />
              <label htmlFor='paypal'>Paypal</label>
            </div>
          </div>
          <label htmlFor='name-on-card'>Name on Card</label>
          <input placeholder='Full name on card' type='text' required />
          <label htmlFor='number-on-card'>Card Number</label>
          <input placeholder='0000-0000-0000-0000' type='text' required />
          <label htmlFor='exp-card'>Expiration Date</label>
          <input placeholder='00/0000' type='text' required />
          <label htmlFor='ccv'>CCV</label>
          <input type='text' required />
          <button className='checkout-btn2'>Continue to checkout</button>
        </form>
      </div>
      {/* Cart Section */}
      <div className='your-cart'>
        <div className='your-cart-heading'>
          <h2>Your Cart</h2>
          <div className='your-cart-qty'>{quantity}</div>
        </div>
        <div className='checkout-items'>
          {cart.map((item) => {
            // Create a variable that calls the filter products passing the current item
            const productItem = getAllItemDetails(item);
            return (
              // Pass cart keys and filtered product keys
              <div key={item.productid} className='checkout-item'>
                <p id='checkout-item-title'>{productItem?.title}</p>
                <p>${productItem?.price}</p>
                <p>{item?.quantity}</p>
              </div>
            );
          })}
        </div>
        <div className='total'>
          <p>Total (USD)</p>
          <p>
            <strong>${subtotal.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
