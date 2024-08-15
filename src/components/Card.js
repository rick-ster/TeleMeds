import React from 'react';
import '../CSS/Card.css'; // For styling the cards

const Card = ({ image, name, description }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
