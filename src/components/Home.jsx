import IntroCard from './IntroCard';
import React from 'react';

function Home() {
  return (
    <div className='main-container'>
      <img className='main-background' />
      <div className='main-overlay'>
        <div className='container'>
          <h5 className='main-title'>Welcome to Made for You!</h5>
          <p className='main-text'>
            Become a member & shop now to see what you can save!
          </p>
        </div>
      </div>
      <div className='cards-container'>
        <IntroCard
          image='https://images.unsplash.com/photo-1526725078729-d6b4c2b2a8b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1381&q=80'
          category='Women'
        />
        <IntroCard
          image='https://images.unsplash.com/photo-1528977695568-bd5e5069eb61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          category='Men'
        />
        <IntroCard
          image='https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          category='Jewelry'
        />
        <IntroCard
          image='https://www.shoppopdisplays.com/blog/wp-content/uploads/2019/01/Retail-display-in-shoe-store.jpg'
          category='Shoes'
        />
      </div>
    </div>
  );
}

export default Home;
