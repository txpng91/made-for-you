import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerUser, logUser, createCart } from '../api';

function AccountForm({ setToken, setId }) {
  const { action } = useParams();
  const navigate = useNavigate();
  const title = action === 'login' ? 'Log In' : 'Sign Up';
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');

  const [validatePassword, setValidatePassword] = useState('');

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
        setId(result.user.id);
        if (result.token) {
          alert(result.message);
          navigate('/');
        }
      } catch (error) {
        setError('Either username or password is incorrect. Please try again.');
      }
    } else {
      // Create new user with fields
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        username: username,
        password: password,
        telephone: telephone,
      };
      // Call the function to create user
      const result = await functType(newUser);
      setToken(result.token); //set current token
      setId(result.user.id); // set current id
      await createCart(result.user.id);
      alert(result.message);
      navigate(`/`);
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
          <button
            className={password.length >= 5 ? 'showSubmitBtn' : 'disableBtn'}
            type='submit'
          >
            {title}
          </button>
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
          <label htmlFor='password'>Confirm Password: </label>
          <input
            type='password'
            value={validatePassword}
            minLength={5}
            onChange={(e) => setValidatePassword(e.target.value)}
            required
          />
          <label htmlFor='telephone'>Phone Number: </label>
          <input
            type='text'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <button
            className={
              password === validatePassword && password.length >= 5
                ? 'showSubmitBtn'
                : 'disableBtn'
            }
            type='submit'
          >
            {title}
          </button>
          <p>{}</p>
        </form>
      )}
      <p className='error-type'>{error ? error : ' '}</p>
    </div>
  );
}

export default AccountForm;
