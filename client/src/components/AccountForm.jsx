import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerUser, logUser } from '../api';

function AccountForm({ setToken, setUserData }) {
  const { action } = useParams();
  const navigate = useNavigate();
  const title = action === 'login' ? 'Log In' : 'Sign Up';
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');

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
        setToken(result.token);
        setUserData(result.user);
        navigate('/');
      } catch (error) {
        console.error(error.response);
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
        phone: phone,
      };

      await functType(newUser);
      alert(`Welcome, ${newUser.name.firstname}! You can now login!`);
      navigate(`/users/login`);
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
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <button type='submit'>{title}</button>
        </form>
      )}
    </div>
  );
}

export default AccountForm;
