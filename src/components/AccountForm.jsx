import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AccountForm({ setToken }) {
  const { action } = useParams();
  const title = action === 'login' ? 'Log In' : 'Sign Up';
  const functType = action === 'login' ? 'logUser' : 'registerUser';
  console.log(functType);
  return (
    <form id='account-form'>
      <h1>{title}</h1>
    </form>
  );
}

export default AccountForm;
