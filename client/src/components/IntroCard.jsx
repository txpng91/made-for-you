import React from 'react';

function IntroCard(props) {
  return (
    <div className='intro-card'>
      <img src={props.image} alt={props.category} />
      <h2>{props.category}</h2>
    </div>
  );
}

export default IntroCard;
