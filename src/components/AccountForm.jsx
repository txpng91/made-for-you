import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerUser, logUser } from '../api';

function AccountForm({ setToken, setPassedUsername }) {
  const { action } = useParams();
  const navigate = useNavigate();
  const title = action === 'login' ? 'Log In' : 'Sign Up';
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const functType = action === 'sign-up' ? registerUser : logUser;
    if (functType === logUser) {
      try {
        const loginUser = {
          username: username,
          password: password,
        };
        const result = await functType(loginUser);
        setPassedUsername(loginUser.username);
        setToken(result.token);
        navigate('/');
      } catch (error) {
        console.error(error.response);
        setError(error.response.data);
      }
    } else {
      const newUser = {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: city,
          street: street,
          number: number,
          zipcode: zipCode,
          geolocation: {
            lat: lat,
            long: long,
          },
        },
        phone: phone,
      };

      await functType(newUser);
      alert(`Welcome, ${newUser.name.firstname}! You can now login!`);
      navigate(`/account/login`);
    }
  };

  return (
    <div id='account-form'>
      <h1>{title}</h1>
      {action === 'login' ? (
        <form id='login' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            value={username}
            minLength={5}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            value={password}
            minLength={5}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>{title}</button>
        </form>
      ) : (
        <form id='register' onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name: </label>
          <input
            type='text'
            value={firstName}
            minLength={2}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor='lastName'>Last Name: </label>
          <input
            type='text'
            value={lastName}
            minLength={2}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            value={username}
            minLength={5}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            value={email}
            minLength={5}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            value={password}
            minLength={5}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor='phone'>Phone Number: </label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor='number'>Number: </label>
          <input
            type='number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <label htmlFor='street'>Street: </label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <label htmlFor='city'>City: </label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label htmlFor='zipCode'>Zip Code: </label>
          <input
            type='text'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          <label htmlFor='lat'>Geolocation(lat): </label>
          <input
            type='text'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
          <label htmlFor='long'>Geolocation(long): </label>
          <input
            type='text'
            value={long}
            onChange={(e) => setLong(e.target.value)}
            required
          />
          <button type='submit'>{title}</button>
        </form>
      )}
    </div>
  );
}

export default AccountForm;
