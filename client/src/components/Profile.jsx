import React from 'react';

function Profile({ userData, setUserData }) {
  return (
    <>
      {!userData ? (
        <h1>Loading ...</h1>
      ) : (
        <div id='profile'>
          <h1>
            Hello, {userData?.firstname} {userData?.lastname}!
          </h1>
          <div className='profile-info'>
            <div className='basic-info'>
              <h2>Basic</h2>
              <p>First Name: {userData?.firstname}</p>
              <p>Last Name: {userData?.lastname}</p>
              <p>Username: {userData?.username}</p>
              <p>Phone: {userData?.telephone}</p>
            </div>
            <div className='address-section'>
              {/* <h2>Address</h2>
              <p>
                {userData?.address?.number} {userData?.address?.street}
              </p>
              <p>
                {userData?.address?.city}, {userData?.address?.zipcode}
              </p> */}
            </div>
          </div>

          {/* <div className='profile-options'></div> */}
        </div>
      )}
    </>
  );
}

export default Profile;
