import React from 'react';

function Profile({ userData, setUserData }) {
  return (
    <>
      {!userData ? (
        <h1>Loading ...</h1>
      ) : (
        <div id='profile'>
          <h2>
            Hello, {userData?.name?.firstname} {userData?.name?.lastname}!
          </h2>
          <div className='profile-info'>
            <p>Email: {userData?.email}</p>
            <p>Phone Number: {userData?.phone}</p>
            <div className='address-section'>
              <h3>Address</h3>
              <p>
                {userData?.address?.number} {userData?.address?.street}
              </p>
              <p>
                {userData?.address?.city}, {userData?.address?.zipcode}
              </p>
            </div>
          </div>
          <div className='profile-options'></div>
        </div>
      )}
    </>
  );
}

export default Profile;
