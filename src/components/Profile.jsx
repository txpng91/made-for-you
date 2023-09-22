import React from 'react';

function Profile({ userData, setUserData }) {
  return (
    <>
      {!userData ? (
        <h1>Loading ...</h1>
      ) : (
        <div id='profile'>
          <h1>
            Hello, {userData?.name?.firstname} {userData?.name?.lastname}!
          </h1>
          <div className='profile-info'>
            <div className='basic-info'>
              <h2>Basic</h2>
              <p>First Name: {userData?.name?.firstname}</p>
              <p>Last Name: {userData?.name?.lastname}</p>
              <p>Email: {userData?.email}</p>
              <p>Phone Number: {userData?.phone}</p>
            </div>
            <div className='address-section'>
              <h2>Address</h2>
              <p>
                {userData?.address?.number} {userData?.address?.street}
              </p>
              <p>
                {userData?.address?.city}, {userData?.address?.zipcode}
              </p>
            </div>
          </div>

          {/* <div className='profile-options'></div> */}
        </div>
      )}
    </>
  );
}

export default Profile;
